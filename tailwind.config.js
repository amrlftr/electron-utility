const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        //sans is the default
        serif: ['Belleza', ...defaultTheme.fontFamily.serif],
        sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      ringColor: ['checked'],
      visibility: ['hover'],
    },
  },
  plugins: [],
}
