import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio.example.com', // Will be updated to owner's production domain
  output: 'static',
  build: {
    format: 'directory',
  },
});
