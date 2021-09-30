const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: colors.lightBlue,
        dark: colors.gray,
        danger: colors.red,
      }
    }
  }
};