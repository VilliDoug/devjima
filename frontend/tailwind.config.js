/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'devjima-teal': '#2D7D6F',
        'devjima-teal-hover': '#1f5c52',
      }
    }
  },
  plugins: [],
}