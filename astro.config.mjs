import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio.example.com', // Update with owner's production domain
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
