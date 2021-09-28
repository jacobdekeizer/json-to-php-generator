const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
    './src/**/*.scss',
  ],
  theme: {
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    extend: {
      colors: {
        'blue-gray': colors.blueGray,
        'light-blue': colors.lightBlue
      }
    }
  }
};