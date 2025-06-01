// tailwind.config.ts
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: false,          // ⬅️ полностью отключает dark-mode
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        shadow: 'var(--color-shadow)',
        main: 'var(--color-main)',
        'main-light': 'var(--color-main-light)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--color-bg': '#F4FAF7',
          '--color-surface': '#FFFFFF',
          '--color-main': '#3FA873',
          '--color-main-light': '#C6E8D5',
          '--color-text': '#1A1A1A',
          '--color-text-muted': '#6B7280',
          '--color-border': '#E5E7EB',
          '--color-shadow': 'rgba(0,0,0,0.06)',
          '--color-error': '#DC2626',
          '--color-success': '#16A34A',
        },
      })
    }),
  ],
}

export default config
