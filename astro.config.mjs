import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.albertyang.io',
  integrations: [react(), tailwind(), robotsTxt(), compress()],
  server: {
    port: 3000,
    host: true
  }
});
