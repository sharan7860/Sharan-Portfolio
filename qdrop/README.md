# QDrop

QDrop is a small sharing toolbox: short links, browser-generated QR codes, 24-hour file transfers, direct-file links, and a public YouTube video tool.

## What works

- Short URLs under `/s/:code` expire after 90 days.
- QR codes are generated locally in the browser and can be saved as PNG.
- Files up to 25 MB are stored in Cloudflare Workers KV. The share page presents a QR code; downloads use `/f/:id`. Files expire automatically after 24 hours. The app reserves up to 800 MB of the free 1 GB KV allowance for active files. A newly uploaded file may take a short time to become available in another region because KV is eventually consistent.
- The direct-link tool opens a public URL in a new tab. The remote host controls whether the browser downloads or previews the file.
- The YouTube card checks public videos for available qualities and downloads a selected quality through a separate Render web service. It does not require a YouTube login for supported public videos. It does not support private, restricted, live, or DRM-protected media. Downloads are limited to 45 minutes and 250 MB, with one processing job at a time. Users must have rights to save the video. Instagram downloading is not implemented; creators can use Instagram's official export tool.

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
7. `npm run deploy:pages`.

The live site is https://qdrop-ble.pages.dev/. A shorter custom domain can be connected later if one is purchased. The original Worker configuration remains in `wrangler.worker.jsonc` for local development or a future Worker deployment.

## Optional YouTube backend

The video card requires a Docker Web Service on Render's free plan. Connect this GitHub repository and deploy branch `codex/qdrop-video` with Docker context `qdrop/video-service` and Dockerfile `qdrop/video-service/Dockerfile`. Set a randomly generated, private `VIDEO_BACKEND_SECRET` of at least 32 characters on Render. The service's `/health` endpoint should return `{"ok":true}`. Then set the same `VIDEO_BACKEND_SECRET` and the service's HTTPS origin as `VIDEO_BACKEND_URL` in the Cloudflare Pages production environment and redeploy Pages. Never put the secret in Git or the browser bundle.

Render's free service sleeps after inactivity, so the first video check may take about a minute. Its free bandwidth and build-time allotments are finite, and a service without a payment method may be suspended if they are exceeded. The video backend must not be exposed as a generic URL fetcher. Metadata checks are limited to 10 per IP per hour and downloads to 3 per IP per hour at the QDrop Worker. The backend accepts only YouTube video IDs and signed, short-lived download links.

Before a public launch, configure Cloudflare bot protection and monitor usage. The built-in upload limits allow six files and twenty links per IP per hour, but public anonymous uploads can still be abused.
