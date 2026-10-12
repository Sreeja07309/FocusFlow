/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#eef2f7',
          100: '#d5ddea',
          200: '#aebbd4',
          300: '#7e92b4',
          400: '#556f96',
          500: '#3a5377',
          600: '#2d4262',
          700: '#243450',
          800: '#1b293f',
          900: '#141d2e',
          950: '#0c121d',
        },
        lavender: {
          50: '#f7f5fb',
          100: '#eee9f6',
          200: '#ddd3ee',
          300: '#c8b8e3',
          400: '#a892d1',
          500: '#8b6dbf',
          600: '#7253a3',
          700: '#5c4284',
          800: '#4d396c',
          900: '#413259',
        },
      },
    },
  },
  plugins: [],
};
