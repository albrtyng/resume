/** @type {import('tailwindcss').Config} */

import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        alphapipe: ["bc-alphapipe", "sans-serif"],
        quicksand: ["quicksand", "sans-serif"],
      },
    },
  },
  plugins: [typography()],
};
