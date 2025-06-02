
const config = {
  darkMode: false,
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'color-main': 'var(--color-main)',
        'color-main-light': 'var(--color-main-light)',
        'color-secondary': 'var(--color-secondary)',
        'color-background-cell': 'var(--color-background-cell)',
        'color-dark': 'var(--color-dark)',
        'color-contrast': 'var(--color-contrast)',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        geologica: ['var(--font-geologica)', 'sans-serif'],
      },
    },
  },

}

export default config
