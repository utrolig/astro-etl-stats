// @ts-check
import { defineConfig } from 'astro/config'
import deno from '@deno/astro-adapter'

import solidJs from '@astrojs/solid-js'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: deno(),
  integrations: [solidJs(), tailwind()],
})
