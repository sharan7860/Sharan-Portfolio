import { copyFile } from 'node:fs/promises';

// Pages Advanced Mode runs the same tested Worker API beside Vite's static assets.
await copyFile(new URL('../src/worker.js', import.meta.url), new URL('../dist/_worker.js', import.meta.url));
