# QDrop

QDrop is a small sharing toolbox: short links, browser-generated QR codes, 24-hour file transfers, and direct-file links.

## What works

- Short URLs under `/s/:code` expire after 90 days.
- QR codes are generated locally in the browser and can be saved as PNG.
- Files up to 25 MB are stored in Cloudflare Workers KV. The share page presents a QR code; downloads use `/f/:id`. Files expire automatically after 24 hours. The app reserves up to 800 MB of the free 1 GB KV allowance for active files. A newly uploaded file may take a short time to become available in another region because KV is eventually consistent.
- The direct-link tool opens a public URL in a new tab. The remote host controls whether the browser downloads or previews the file.

## Experimental video tool (not live)

The `video-service/` prototype is retained on branch `codex/qdrop-video`, but the fifth card is not included in the public frontend. On Render's free hosting IP, YouTube returned “Sign in to confirm you’re not a bot” for public videos that extracted successfully on a local machine without login. The live downloader therefore cannot honestly be offered as working. Do not add the video card back until an end-to-end download succeeds from a suitable backend. Instagram downloading is not implemented; creators can use Instagram's official export tool.

## Local development

1. Run `npm install`.
2. Create a local D1 database with `npm run db:local`.
3. In one terminal run `npm run worker:dev`; in another run `npm run dev`.
4. Open the Vite URL. Vite proxies API and download routes to the local Worker.

To preview the Pages deployment bundle locally, run `npm run build:pages`, then `npx wrangler pages dev dist`. The Pages build serves the same API through `_worker.js`.

The `.dev.vars` value is for local rate limits only and is not deployed. Keep a production salt as a Wrangler secret.

## Cloudflare Pages deployment

Requires a Cloudflare account with the free Workers, D1, and KV services. No R2 activation or payment method is needed.

1. `npx wrangler login`
2. `npx wrangler d1 create qdrop-db`
3. Copy the returned database ID into `wrangler.jsonc` and `wrangler.worker.jsonc`.
4. `npx wrangler kv namespace create qdrop-files`, then copy the namespace ID into both Wrangler files.
5. `npm run db:remote`
6. Create a Pages project with the shortest available memorable name, then put a private `RATE_LIMIT_SALT` secret in that project.
7. From the production branch, `npm run deploy:pages`. From another branch, build with `npm run build:pages` and deploy with `npx wrangler pages deploy dist --branch main` only after confirming that build is production-ready. Deploying without `--branch main` from a feature branch creates a preview.

The Cloudflare Pages site at https://qdrop-ble.pages.dev/ remains the API and download backend. The public short address is https://qdrop.web.app/. The original Worker configuration remains in `wrangler.worker.jsonc` for local development or a future Worker deployment.

## Firebase Hosting deployment

Firebase Hosting serves the four working tool cards at `qdrop.web.app` on the no-cost Spark plan. The frontend build in `.env.firebase` calls the existing Cloudflare Pages API. Cloudflare allows cross-origin API requests only from `https://qdrop.web.app`; short-link and file-download paths on Firebase redirect to the Cloudflare backend. The browser presents new short and file-share links under `qdrop.web.app`.

1. `npm run build:firebase`
2. `npx -y firebase-tools@latest deploy --only hosting --project qdrop-sharan-2026`

The Firebase config targets only the `qdrop` Hosting site in the dedicated `qdrop-sharan-2026` project. Run `npm run build:pages` before deploying to Cloudflare Pages, since the Firebase build intentionally excludes the Pages Worker.

## Experimental YouTube backend

The prototype uses a Docker Web Service on Render's free plan, deployed from branch `codex/qdrop-video` with root directory `qdrop/video-service`, Docker build context `.`, and Dockerfile `Dockerfile`. A private `VIDEO_BACKEND_SECRET` of at least 32 characters must match between Render and Cloudflare Pages; `VIDEO_BACKEND_URL` is the service's HTTPS origin. Never put the secret in Git or the browser bundle. The health check succeeds, but YouTube challenges the Render IP, so the download flow fails in production and is not enabled on the live site.

Render's free service sleeps after inactivity, so the first video check may take about a minute. Its free bandwidth and build-time allotments are finite, and a service without a payment method may be suspended if they are exceeded. The video backend must not be exposed as a generic URL fetcher. Metadata checks are limited to 10 per IP per hour and downloads to 3 per IP per hour at the QDrop Worker. The backend accepts only YouTube video IDs and signed, short-lived download links.

Before a public launch, configure Cloudflare bot protection and monitor usage. The built-in upload limits allow six files and twenty links per IP per hour, but public anonymous uploads can still be abused.
