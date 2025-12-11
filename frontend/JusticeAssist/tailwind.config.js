/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        navy: '#112D4E',
        blue: '#3F72AF',
        lightBlue: '#DBE2EF',
        lightGray: '#F9F7F7',
      },
      borderRadius: {
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
}
