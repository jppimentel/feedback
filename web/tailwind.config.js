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
      },
      blue:{
        100: '#a2d2ff',
        500: '#118ab2',
        800: '#073b4c'
      },
      cyan:{
        500: '#06d6a0'
      },
      yellow:{
        300: '#ffd166'
      },
      pink: {
        300: '#ef476f'
      }
    },
  },
  plugins: [],
}
