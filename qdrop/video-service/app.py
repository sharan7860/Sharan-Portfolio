"""Small, rate-limited companion for QDrop's public YouTube video tool.

The Cloudflare Worker is the public gate: it limits requests and signs download
links. This service accepts only a YouTube video ID, never an arbitrary URL.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import logging
import mimetypes
import os
import re
import subprocess
import sys
import tempfile
import threading
import time
from pathlib import Path

from fastapi import FastAPI, Header, HTTPException, Query
from fastapi.background import BackgroundTasks
from fastapi.responses import FileResponse

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

VIDEO_ID = re.compile(r"^[A-Za-z0-9_-]{11}$")
DOWNLOAD_LOCK = threading.BoundedSemaphore(1)
MAX_DURATION = 45 * 60
MAX_BYTES = 250 * 1024 * 1024
MAX_HEIGHT = 1080
ALLOWED_EXTENSIONS = {".mp4", ".mkv", ".webm"}


def secret() -> str:
    value = os.environ.get("VIDEO_BACKEND_SECRET", "")
    if len(value) < 32:
        raise HTTPException(503, "Video service is not configured.")
    return value


def require_video(video: str) -> str:
    if not VIDEO_ID.fullmatch(video):
        raise HTTPException(400, "Enter a valid YouTube video link.")
    return video


def video_url(video: str) -> str:
    return f"https://www.youtube.com/watch?v={video}"


def extract_info(video: str) -> dict:
    command = [
        sys.executable, "-m", "yt_dlp", "--ignore-config", "--no-playlist", "--no-warnings",
        "--js-runtimes", "node", "--socket-timeout", "15", "--retries", "1",
        "--dump-single-json", video_url(video),
    ]
    try:
        result = subprocess.run(command, capture_output=True, text=True, timeout=65, check=False)
    except subprocess.TimeoutExpired as exc:
        raise HTTPException(504, "YouTube took too long to respond. Try again.") from exc
    if result.returncode:
        logging.warning("Video metadata extractor failed: %s", result.stderr[-2500:])
        raise HTTPException(422, "This video is unavailable for download right now.")
    try:
        info = json.loads(result.stdout)
    except json.JSONDecodeError as exc:
        raise HTTPException(502, "Could not read video information.") from exc
    duration = info.get("duration") or 0
    if not isinstance(duration, (int, float)) or duration <= 0 or duration > MAX_DURATION:
        raise HTTPException(422, "Only videos up to 45 minutes are supported on this free service.")
    if info.get("is_live") or (info.get("was_live") and not info.get("formats")):
        raise HTTPException(422, "Live streams are not supported.")
    return info


def available_heights(info: dict) -> list[int]:
    audio_sizes = [
        fmt.get("filesize") or fmt.get("filesize_approx")
        for fmt in info.get("formats", [])
        if fmt.get("acodec") not in (None, "none") and fmt.get("vcodec") == "none"
        and isinstance(fmt.get("filesize") or fmt.get("filesize_approx"), (int, float))
    ]
    audio_allowance = min(audio_sizes) if audio_sizes else 20 * 1024 * 1024
    heights = {
        int(fmt["height"])
        for fmt in info.get("formats", [])
        if isinstance(fmt.get("height"), (int, float))
        and 144 <= fmt["height"] <= MAX_HEIGHT
        and fmt.get("vcodec") not in (None, "none")
        and not fmt.get("has_drm")
        and (fmt.get("filesize") or fmt.get("filesize_approx") or 0) + audio_allowance <= MAX_BYTES
    }
    return sorted(heights, reverse=True)[:6]


@app.get("/health")
def health() -> dict:
    return {"ok": True}


@app.get("/formats")
def formats(video: str = Query(...), x_backend_secret: str = Header(default="")) -> dict:
    if not hmac.compare_digest(x_backend_secret, secret()):
        raise HTTPException(401, "Unauthorized.")
    video = require_video(video)
    info = extract_info(video)
    heights = available_heights(info)
    if not heights:
        raise HTTPException(422, "No downloadable quality is available for this video.")
    return {
        "video": video,
        "title": str(info.get("title") or "YouTube video")[:180],
        "duration": int(info["duration"]),
        "qualities": heights,
    }


def verify_signature(video: str, height: int, expires: int, signature: str) -> None:
    now = int(time.time())
    if expires < now or expires > now + 300 or height < 144 or height > MAX_HEIGHT:
        raise HTTPException(403, "This download link has expired. Choose a quality again.")
    expected = hmac.new(secret().encode(), f"{video}.{height}.{expires}".encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, expected):
        raise HTTPException(403, "Invalid download link.")


@app.get("/download")
def download(
    background_tasks: BackgroundTasks,
    video: str = Query(...),
    height: int = Query(...),
    expires: int = Query(...),
    signature: str = Query(...),
):
    video = require_video(video)
    verify_signature(video, height, expires, signature)
    if not DOWNLOAD_LOCK.acquire(blocking=False):
        raise HTTPException(429, "A download is already running. Try again shortly.")

    work = tempfile.TemporaryDirectory(prefix="qdrop-video-")
    try:
        info = extract_info(video)
        if height not in available_heights(info):
            raise HTTPException(422, "That quality is no longer available. Check formats again.")
        selector = (
            f"bestvideo[height={height}][ext=mp4]+bestaudio[ext=m4a]/"
            f"best[height={height}][ext=mp4]/"
            f"bestvideo[height={height}]+bestaudio/best[height={height}]"
        )
        command = [
            sys.executable, "-m", "yt_dlp", "--ignore-config", "--no-playlist", "--no-warnings",
            "--js-runtimes", "node", "--socket-timeout", "15", "--retries", "1",
            "--fragment-retries", "1", "--max-filesize", "250M",
            "--merge-output-format", "mp4", "--no-progress",
            "--format", selector, "--output", str(Path(work.name) / "video.%(ext)s"),
            video_url(video),
        ]
        try:
            result = subprocess.run(command, capture_output=True, text=True, timeout=240, check=False)
        except subprocess.TimeoutExpired as exc:
            raise HTTPException(504, "Download took too long. Try a lower quality.") from exc
        if result.returncode:
            logging.warning("Video download extractor failed: %s", result.stderr[-2500:])
            raise HTTPException(422, "This quality could not be downloaded. Try another.")
        files = [path for path in Path(work.name).glob("video.*") if path.suffix in ALLOWED_EXTENSIONS]
        if len(files) != 1 or files[0].stat().st_size > MAX_BYTES:
            raise HTTPException(422, "The video exceeds the 250 MB free-service limit.")
        output = files[0]
        title = re.sub(r"[^\w .-]", "_", str(info.get("title") or "video"), flags=re.UNICODE).strip(" ._")[:90]
        filename = f"{title or 'video'}-{height}p{output.suffix}"
        background_tasks.add_task(work.cleanup)
        background_tasks.add_task(DOWNLOAD_LOCK.release)
        return FileResponse(
            output,
            filename=filename,
            media_type=mimetypes.guess_type(filename)[0] or "application/octet-stream",
            background=background_tasks,
        )
    except Exception:
        work.cleanup()
        DOWNLOAD_LOCK.release()
        raise
