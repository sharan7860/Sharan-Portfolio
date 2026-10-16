import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8787',
      '/s': 'http://127.0.0.1:8787',
      '/f': 'http://127.0.0.1:8787',
    },
  },
});
