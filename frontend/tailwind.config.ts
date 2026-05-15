import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        paper: {
          0:   '#FFFFFF',
          50:  '#FAFAF7',
          100: '#F4F4EE',
          200: '#EAEAE2',
          300: '#D8D8CE',
          400: '#B5B5A8',
          500: '#8A8A7C',
          600: '#5F5F55',
          700: '#3D3D36',
          800: '#1F1F1B',
          900: '#0E0E0C',
        },
        cobalt: {
          50:  '#EEF1FE',
          100: '#DDE3FD',
          200: '#B9C4FB',
          300: '#8B9DF8',
          400: '#5C76F2',
          500: '#2B4FE8',
          600: '#1E3CC9',
          700: '#182FA0',
          800: '#14267D',
          900: '#0E1B5C',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans:  ['var(--font-sans)', 'sans-serif'],
        mono:  ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15,23,42,0.04), 0 1px 1px rgba(15,23,42,0.03)',
        md: '0 2px 4px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.08)',
        lg: '0 4px 8px rgba(15,23,42,0.04), 0 24px 48px -12px rgba(15,23,42,0.12)',
        xl: '0 8px 16px rgba(15,23,42,0.06), 0 40px 80px -16px rgba(15,23,42,0.18)',
      },
      borderRadius: {
        '0':    '0px',
        '1':    '4px',
        '2':    '8px',
        '3':    '12px',
        '4':    '16px',
        '5':    '24px',
        full:   '999px',
      },
    },
  },
}

export default config
