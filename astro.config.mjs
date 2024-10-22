// @ts-check
import { defineConfig } from "astro/config";
import deno from "@deno/astro-adapter";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: deno(),
  integrations: [solidJs()],
});