// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages deploys to /portfolio/
  base: '/portfolio/',

  build: {
    outDir: 'dist',
    // Clean output on every build
    emptyOutDir: true,
  },
});
