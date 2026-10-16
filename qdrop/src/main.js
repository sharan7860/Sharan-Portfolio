import QRCode from 'qrcode';
import './style.css';

const app = document.querySelector('#app');
const fileId = new URLSearchParams(location.search).get('file');

app.innerHTML = `
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="/" aria-label="QDrop home"><span class="brand-mark">q<span>.</span></span><span>qdrop</span></a>
      <a class="header-link" href="#tools">Explore tools <span aria-hidden="true">↗</span></a>
    </header>

    <main>
      <section class="hero compact-hero">
        <div class="hero-content">
          <div class="eyebrow"><span class="eyebrow-dot"></span> QDROP · SHARING TOOLS</div>
          <h1>Share, <em>simply.</em></h1>
          <p class="hero-copy">Short links, QR codes, files, and video tools in one place. Pick a card to get started.</p>
        </div>
      </section>

      <section class="tools-section" id="tools">
        <div class="tool-layout">
          <div class="tool-menu" role="group" aria-label="Sharing tools">
            <button class="tool-tab" id="tab-shorten" type="button" data-tool="shorten" aria-expanded="false" aria-controls="tool-panel"><span class="card-top"><span class="card-number">01 / LINKS</span><span class="tab-icon">↗</span></span><span class="card-copy"><strong>Shorten a link</strong><small>Turn a long web address into a clean link that’s easy to send and remember.</small></span><span class="card-action">Create a short link <span aria-hidden="true">↗</span></span></button>
            <button class="tool-tab" id="tab-qr" type="button" data-tool="qr" aria-expanded="false" aria-controls="tool-panel"><span class="card-top"><span class="card-number">02 / QR CODES</span><span class="tab-icon">▦</span></span><span class="card-copy"><strong>Make a QR code</strong><small>Give any link a scannable code you can save as an image.</small></span><span class="card-action">Create a QR code <span aria-hidden="true">↗</span></span></button>
            <button class="tool-tab" id="tab-file" type="button" data-tool="file" aria-expanded="false" aria-controls="tool-panel"><span class="card-top"><span class="card-number">03 / FILES</span><span class="tab-icon">↑</span></span><span class="card-copy"><strong>Share a file</strong><small>Show a QR on your laptop so someone can scan it and download on their phone.</small></span><span class="card-action">Share a file <span aria-hidden="true">↗</span></span></button>
            <button class="tool-tab" id="tab-download" type="button" data-tool="download" aria-expanded="false" aria-controls="tool-panel"><span class="card-top"><span class="card-number">04 / DIRECT FILES</span><span class="tab-icon">↓</span></span><span class="card-copy"><strong>Open a direct file</strong><small>Open a public file URL. YouTube and Instagram share links are not file URLs.</small></span><span class="card-action">Open a file link <span aria-hidden="true">↗</span></span></button>
            <button class="tool-tab" id="tab-video" type="button" data-tool="video" aria-expanded="false" aria-controls="tool-panel"><span class="card-top"><span class="card-number">05 / YOUTUBE</span><span class="tab-icon">▶</span></span><span class="card-copy"><strong>Save a video</strong><small>Paste a public YouTube link, choose an available quality, and download.</small></span><span class="card-action">Choose quality <span aria-hidden="true">↗</span></span></button>
          </div>
          <div class="tool-panel" id="tool-panel" role="region" tabindex="-1" hidden>
            <div class="panel-overline"><span class="panel-dot"></span><span id="panel-index">TOOL 01 / SHORT LINK</span></div>
            <div class="panel-content" id="panel-content"></div>
          </div>
        </div>
      </section>

    </main>
    <footer><a class="brand" href="/"><span class="brand-mark">q<span>.</span></span><span>qdrop</span></a><span>Good things travel light.</span><span>© ${new Date().getFullYear()} QDrop</span></footer>
  </div>`;

const panel = document.querySelector('#panel-content');
const index = document.querySelector('#panel-index');
const labels = { shorten: 'TOOL 01 / SHORT LINK', qr: 'TOOL 02 / QR CODE', file: 'TOOL 03 / FILE SHARE', download: 'TOOL 04 / DIRECT LINK', video: 'TOOL 05 / YOUTUBE' };

function message(target, text, kind = 'error') {
  target.textContent = text;
  target.className = `message ${kind}`;
}

function urlValue(raw) {
  try {
    const url = new URL(raw.trim());
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.')) return null;
    return url.href;
  } catch { return null; }
}

function fileSize(bytes) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function qrToCanvas(canvas, value) {
  await QRCode.toCanvas(canvas, value, { width: 200, margin: 1, color: { dark: '#152924', light: '#ffffff' }, errorCorrectionLevel: 'M' });
}

async function copy(value, button) {
  try { await navigator.clipboard.writeText(value); button.textContent = 'Copied ✓'; setTimeout(() => button.textContent = 'Copy link', 2200); }
  catch { button.textContent = 'Select link to copy'; }
}

function resultBox(url, details, withQr = true) {
  const box = document.createElement('div');
  box.className = 'result-box';
  box.innerHTML = `<div class="result-label">READY TO SHARE <span>✳</span></div><div class="result-row"><a class="result-url" target="_blank" rel="noopener noreferrer"></a><button class="copy-button" type="button">Copy link</button></div><div class="result-details"></div>${withQr ? '<div class="result-qr"><canvas aria-label="QR code for the link"></canvas><span>Scan with your phone camera</span></div>' : ''}`;
  box.querySelector('.result-url').href = url;
  box.querySelector('.result-url').textContent = url;
  box.querySelector('.result-details').textContent = details;
  box.querySelector('.copy-button').addEventListener('click', event => copy(url, event.currentTarget));
  if (withQr) qrToCanvas(box.querySelector('canvas'), url).catch(() => {});
  return box;
}

function renderShorten() {
  panel.innerHTML = `<div class="tool-symbol">↗</div><h3>Make a long link<br>short and sweet.</h3><p class="panel-copy">Paste any public web address and get a clean link you’ll actually want to share.</p><form id="short-form"><label for="short-url">YOUR LONG LINK</label><div class="input-row"><input id="short-url" type="url" placeholder="https://example.com/a-very-long-link" required maxlength="2048"><button type="submit">Shorten it <span>↗</span></button></div></form><div class="message" id="short-message"></div><div id="short-result"></div><p class="fine-print">Links expire after 90 days. Only shorten links you trust.</p>`;
  document.querySelector('#short-form').addEventListener('submit', async event => {
    event.preventDefault();
    const submit = event.currentTarget.querySelector('button');
    const status = document.querySelector('#short-message');
    const value = urlValue(document.querySelector('#short-url').value);
    if (!value) return message(status, 'Enter a valid public http or https link.');
    submit.disabled = true; submit.textContent = 'Working…'; message(status, '', 'success');
    try {
      const response = await fetch('/api/links', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: value }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not shorten this link.');
      const result = document.querySelector('#short-result'); result.replaceChildren(resultBox(data.shortUrl, 'This short link works for 90 days.'));
      message(status, 'Your short link is ready.', 'success');
    } catch (error) { message(status, error.message); }
    finally { submit.disabled = false; submit.innerHTML = 'Shorten it <span>↗</span>'; }
  });
}

function renderQr() {
  panel.innerHTML = `<div class="tool-symbol">▦</div><h3>One scan gets<br>you there.</h3><p class="panel-copy">Turn a website link into a crisp QR code. Download it as a PNG or share the link.</p><form id="qr-form"><label for="qr-url">LINK TO TURN INTO A QR</label><div class="input-row"><input id="qr-url" type="url" placeholder="https://example.com" required><button type="submit">Make QR <span>↗</span></button></div></form><div class="message" id="qr-message"></div><div id="qr-result"></div><p class="fine-print">Made on your device. The link is not sent to our server.</p>`;
  document.querySelector('#qr-form').addEventListener('submit', async event => {
    event.preventDefault();
    const value = urlValue(document.querySelector('#qr-url').value);
    const status = document.querySelector('#qr-message');
    if (!value) return message(status, 'Enter a valid http or https link.');
    const result = document.querySelector('#qr-result');
    result.innerHTML = `<div class="qr-download"><canvas aria-label="Your QR code"></canvas><div><strong>Your QR is ready.</strong><span>Point a phone camera at the code to open your link.</span><button class="secondary-button" type="button" id="download-qr">Download PNG ↓</button></div></div>`;
    try {
      const canvas = result.querySelector('canvas');
      await QRCode.toCanvas(canvas, value, { width: 220, margin: 2, color: { dark: '#152924', light: '#ffffff' }, errorCorrectionLevel: 'H' });
      document.querySelector('#download-qr').addEventListener('click', () => {
        const a = document.createElement('a'); a.href = canvas.toDataURL('image/png'); a.download = 'qdrop-qr.png'; a.click();
      });
      message(status, 'Your code is ready to scan.', 'success');
    } catch { message(status, 'Could not create a QR code for this link.'); }
  });
}

function renderFile() {
  panel.innerHTML = `<div class="tool-symbol">↑</div><h3>From your laptop<br>to their phone.</h3><p class="panel-copy">Choose a file. We’ll give you a link and QR code so someone can scan and download it.</p><form id="file-form"><label for="file-input">PICK A FILE · UP TO 25 MB</label><label class="file-picker" for="file-input"><span class="upload-icon">↑</span><strong id="file-name">Click to choose a file</strong><small>Any file type · available for 24 hours</small></label><input id="file-input" type="file" required><button class="full-button" type="submit">Create a share link <span>↗</span></button></form><div class="message" id="file-message"></div><div id="file-result"></div><p class="fine-print">Anyone with the link can download the file until it expires. Avoid sharing sensitive files.</p>`;
  const input = document.querySelector('#file-input');
  input.addEventListener('change', () => { document.querySelector('#file-name').textContent = input.files[0]?.name || 'Click to choose a file'; });
  document.querySelector('#file-form').addEventListener('submit', async event => {
    event.preventDefault();
    const file = input.files[0];
    const status = document.querySelector('#file-message');
    if (!file) return message(status, 'Choose a file first.');
    if (file.size > 25 * 1024 * 1024) return message(status, 'This file is over the 25 MB limit.');
    const button = event.currentTarget.querySelector('button');
    button.disabled = true; button.textContent = 'Uploading…'; message(status, 'Uploading your file. Keep this tab open.', 'success');
    try {
      const response = await fetch('/api/files', { method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream', 'X-File-Name': encodeURIComponent(file.name) }, body: file });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not upload this file.');
      document.querySelector('#file-result').replaceChildren(resultBox(data.shareUrl, `${data.name} · ${fileSize(data.size)} · expires in 24 hours`));
      message(status, 'Your file is ready to share.', 'success');
    } catch (error) { message(status, error.message); }
    finally { button.disabled = false; button.innerHTML = 'Create a share link <span>↗</span>'; }
  });
}

function renderVideo() {
  panel.innerHTML = `<div class="tool-symbol">▶</div><h3>Pick a quality.<br>Save your video.</h3><p class="panel-copy">Paste a public YouTube video link. Available qualities will appear below. No YouTube sign-in is needed for supported public videos.</p><form id="video-form"><label for="video-url">YOUTUBE VIDEO URL</label><div class="input-row"><input id="video-url" type="url" placeholder="https://youtu.be/…" required maxlength="2048"><button type="submit">Find qualities <span>↗</span></button></div></form><div class="message" id="video-message"></div><div id="video-result"></div><p class="fine-print">Only save videos you own or have permission to download. This free service supports videos up to 45 minutes and 250 MB; some videos or qualities may be unavailable.</p>`;
  document.querySelector('#video-form').addEventListener('submit', async event => {
    event.preventDefault();
    const button = event.currentTarget.querySelector('button');
    const status = document.querySelector('#video-message');
    const result = document.querySelector('#video-result');
    const value = urlValue(document.querySelector('#video-url').value);
    if (!value) return message(status, 'Enter a valid YouTube video URL.');
    button.disabled = true; button.textContent = 'Checking…'; result.replaceChildren();
    message(status, 'Checking available formats. A sleeping free server may take a minute to wake up.', 'success');
    try {
      const response = await fetch(`/api/videos/formats?url=${encodeURIComponent(value)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not check this video.');
      const box = document.createElement('div');
      box.className = 'result-box video-result';
      box.innerHTML = `<div class="result-label">VIDEO FOUND <span>✳</span></div><strong class="video-title"></strong><span class="video-duration"></span><label class="video-quality-label" for="video-quality">CHOOSE QUALITY</label><select id="video-quality"></select><label class="video-rights"><input type="checkbox" id="video-rights"> I own this video or have permission to save it.</label><a class="full-button video-download" target="_blank" rel="noopener noreferrer" aria-disabled="true">Download video ↓</a>`;
      box.querySelector('.video-title').textContent = data.title;
      box.querySelector('.video-duration').textContent = `${Math.ceil(data.duration / 60)} min · up to ${Math.max(...data.qualities)}p`;
      const select = box.querySelector('#video-quality');
      data.qualities.forEach(height => {
        const option = document.createElement('option');
        option.value = String(height); option.textContent = `${height}p`;
        select.append(option);
      });
      const rights = box.querySelector('#video-rights');
      const link = box.querySelector('.video-download');
      const updateLink = () => {
        link.href = rights.checked ? `/api/videos/download?url=${encodeURIComponent(value)}&quality=${encodeURIComponent(select.value)}` : '#';
        link.setAttribute('aria-disabled', String(!rights.checked));
      };
      rights.addEventListener('change', updateLink);
      select.addEventListener('change', updateLink);
      link.addEventListener('click', click => { if (!rights.checked) click.preventDefault(); });
      updateLink();
      result.append(box);
      message(status, 'Choose a quality to download.', 'success');
    } catch (error) { message(status, error.message); }
    finally { button.disabled = false; button.innerHTML = 'Find qualities <span>↗</span>'; }
  });
}

function renderDownload() {
  panel.innerHTML = `<div class="tool-symbol">↓</div><h3>Got a direct<br>file link?</h3><p class="panel-copy">Paste a public file URL and we’ll open it in your browser. Video share links lead to watch pages, not downloadable files. The file host decides whether a direct link downloads or opens in a tab.</p><form id="download-form"><label for="download-url">PUBLIC FILE URL</label><div class="input-row"><input id="download-url" type="url" placeholder="https://example.com/file.pdf" required><button type="submit">Open file <span>↗</span></button></div></form><div class="message" id="download-message"></div><div class="platform-note"><strong>For videos you own</strong><p>Use the official tools to export your own content from <a href="https://support.google.com/youtube/answer/56100" target="_blank" rel="noopener noreferrer">YouTube Studio ↗</a> or <a href="https://www.instagram.com/download/request/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>.</p></div><p class="fine-print">This tool does not access private, protected, or streaming media.</p>`;
  document.querySelector('#download-form').addEventListener('submit', event => {
    event.preventDefault();
    const status = document.querySelector('#download-message');
    const value = urlValue(document.querySelector('#download-url').value);
    if (!value) return message(status, 'Enter a valid public http or https link.');
    const host = new URL(value).hostname.toLowerCase();
    if (['youtube.com', 'youtu.be', 'youtube-nocookie.com', 'instagram.com'].some(domain => host === domain || host.endsWith(`.${domain}`))) {
      return message(status, 'That is a video watch/share link, not a direct file URL. For a video you uploaded, use the official export link below.');
    }
    const link = document.createElement('a');
    link.href = value; link.target = '_blank'; link.rel = 'noopener noreferrer';
    document.body.append(link); link.click(); link.remove();
    message(status, 'Opened the link in a new tab.', 'success');
  });
}

const renderers = { shorten: renderShorten, qr: renderQr, file: renderFile, video: renderVideo, download: renderDownload };
function selectTool(tool, reveal = false) {
  document.querySelectorAll('.tool-tab').forEach(button => {
    const active = button.dataset.tool === tool;
    button.classList.toggle('active', active);
    button.setAttribute('aria-expanded', String(active));
  });
  index.textContent = labels[tool];
  const toolPanel = document.querySelector('#tool-panel');
  toolPanel.hidden = false;
  toolPanel.setAttribute('aria-labelledby', `tab-${tool}`);
  renderers[tool]();
  if (reveal) toolPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('.tool-tab').forEach(button => button.addEventListener('click', () => selectTool(button.dataset.tool, true)));

if (fileId) {
  selectTool('file');
  panel.innerHTML = `<div class="tool-symbol">↓</div><h3>Someone sent<br>you a file.</h3><p class="panel-copy" id="received-description">Checking your download…</p><div class="message" id="receive-message"></div><div id="receive-action"></div><p class="fine-print">This link is available for 24 hours after upload.</p>`;
  fetch(`/api/files/${encodeURIComponent(fileId)}`).then(async response => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'File unavailable.');
    document.querySelector('#received-description').textContent = `${data.name} · ${fileSize(data.size)}`;
    const link = document.createElement('a');
    link.className = 'full-button download-link'; link.href = `/f/${encodeURIComponent(fileId)}`; link.textContent = 'Download file ↓';
    document.querySelector('#receive-action').append(link);
    message(document.querySelector('#receive-message'), 'Ready to download.', 'success');
  }).catch(error => message(document.querySelector('#receive-message'), error.message));
  document.querySelector('#tool-panel').scrollIntoView();
}
