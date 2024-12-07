/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'mobile': { max: '425px' },
      'tablet': { min: '425px', max: '768px'},
      'desktop': '769px',
    },
    extend: {},
  },
  plugins: [],
}

