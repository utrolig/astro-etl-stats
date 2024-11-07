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
          bg: 'hsl(var(--etl-bg) / <alpha-value>)',
          'bg-100': 'hsl(var(--etl-bg-100) / <alpha-value>)',
          'bg-200': 'hsl(var(--etl-bg-200) / <alpha-value>)',
          100: 'hsl(var(--etl-100) / <alpha-value>)',
          200: 'hsl(var(--etl-200) / <alpha-value>)',
          300: 'hsl(var(--etl-300) / <alpha-value>)',
          400: 'hsl(var(--etl-400) / <alpha-value>)',
        },
      },
      gridTemplateColumns: {
        matchHeader: '1fr auto 1fr',

        matchTable:
          'minmax(140px, 2fr) minmax(40px, 1fr) minmax(40px, 1fr) minmax(40px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(60px, 1fr) minmax(50px, 1fr) minmax(50px, 1fr) minmax(60px, 1fr)',
        matchTableSm:
          'minmax(100px, 2fr) 1fr 1fr 1fr minmax(100px, 1fr) minmax(100px, 1fr) minmax(60px, 1fr) minmax(50px, 1fr) minmax(50px, 1fr) minmax(60px, 1fr)',
        playerStats: '100px 60px 80px 40px 40px 40px',
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
