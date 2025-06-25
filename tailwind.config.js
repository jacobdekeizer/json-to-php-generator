// const colors = require('tailwindcss/colors')
import colors from 'tailwindcss/colors';

module.exports = {
  darkMode: 'class',
  content: ['./public/**/*.html', './src/**/*.vue', './src/**/*.scss'],
  theme: {
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: colors.sky,
        dark: colors.gray,
        danger: colors.red,
      },
    },
  },
};
