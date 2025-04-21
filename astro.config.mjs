import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://janpoupa.com',
  base: '/goglance',
  adapter: vercel(),
})