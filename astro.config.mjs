// @ts-check
import cloudflare from '@astrojs/cloudflare'
import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [solidJs(), tailwind()],
})
