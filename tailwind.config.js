/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        border: 'var(--color-border)',
        title: 'var(--color-title)',
        info: 'var(--color-info)',
        'info-contrast': 'var(--color-info-contrast)',
        danger: 'var(--color-danger)',
      },
    },
  },
  plugins: [],
};
