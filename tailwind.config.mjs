import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import tailwindForms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Variable', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        etl: {
          text: 'hsl(var(--etl-text) / <alpha-value>)',
          'text-dark': 'hsl(var(--etl-text-dark) / <alpha-value>)',
          bg: 'hsl(var(--etl-bg) / <alpha-value>)',
          100: 'hsl(var(--etl-100) / <alpha-value>)',
          200: 'hsl(var(--etl-200) / <alpha-value>)',
          300: 'hsl(var(--etl-300) / <alpha-value>)',
          400: 'hsl(var(--etl-400) / <alpha-value>)',
          blue: 'hsl(var(--etl-blue) / <alpha-value>)',
          pink: 'hsl(var(--etl-pink) / <alpha-value>)',
          link: 'hsl(var(--etl-link) / <alpha-value>)',
          'link-hover': 'hsl(var(--etl-link-hover) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [
    tailwindForms,
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
      })
    }),
  ],
}
