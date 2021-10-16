const colors = require('tailwindcss/colors')
module.exports = {
  purge: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#0f4c81',
      secondary: '#94B4CF',
      content: '#9FACB8',
    },
    extend: {
      colors: {
        emerald: colors.emerald,
        gray: colors.trueGray,
        white: colors.white,
        indigo: colors.indigo,
        blueGray: colors.blueGray,
        blue: colors.blue,
        red: colors.red,
      },
      fontFamily: {
        eng:['Ubuntu'],
        th:['Kanit'],
      },
    },
    screens: {
      'sm': {'max':'640px'},
      // => @media (max-width: 640px) { ... }

      'md': {'max':'768px'},
      // => @media (max-width: 768px) { ... }

      'lg': {'max':'1024px'},
      // => @media (max-width: 1024px) { ... }

      'xl': {'max':'1280px'},
      // => @media (max-width: 1280px) { ... }

      '2xl': {'max':'1536px'},
      // => @media (max-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
