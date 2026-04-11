// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages deploys to /portfolio/ — adjust if your base path differs
  base: '/portfolio/',

  build: {
    outDir: 'dist',
    // Clean output on every build
    emptyOutDir: true,
  },
});
