/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        orange:{
          100: '#ECB390',
          300: '#F28E36'
        }
      }
    },
  },
  plugins: [],
}
