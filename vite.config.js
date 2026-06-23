import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Generates relative paths for all assets to support deployment on subpaths (like GitHub Pages)
});
