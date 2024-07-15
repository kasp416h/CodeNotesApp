/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          'light': {
            'name': 'light',
            'base-100': '#FFFFFF',
            'base-200': '#C7D1DB',
            'base-300': '#B6C2CF',
            'base-text': '#111111',
          },
          'dark': {
            'name': 'dark',
            'base-100': '#101214',
            'base-200': '#1D2125',
            'base-300': '#282E33',
            'base-text': '#FFFFFF',
          }
        }
      },
    },
    plugins: [],
  }