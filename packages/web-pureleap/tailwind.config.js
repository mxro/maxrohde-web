/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/routes/**/*.tsx',
    './src/components/**/*.tsx',
    './../dynamodb-blog/src/components/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        gruppo: ['Gruppo', 'sans-serif'],
        robotoslab: ['Roboto Slab', 'serif'],
      },
      // via https://www.tints.dev
      colors: {
        black: '#001415',
        white: '#F7D7CA',
        orange: '#FF7642',
        scorched: {
          50: '#EFE5E1',
          100: '#E1CEC6',
          200: '#C49D8D',
          300: '#A46D55',
          400: '#6B4738',
          500: '#32211A', // from pic
          DEFAULT: '#32211A',
          600: '#281B15',
          700: '#1E1410',
          800: '#140D0A',
          900: '#0A0705',
          950: '#030202',
        },
        eggyolk: {
          50: '#FFF9F0',
          100: '#FFF5E6',
          200: '#FFEBCC',
          300: '#FEE2B3',
          400: '#FED89A',
          500: '#FECE7F', // from pic
          DEFAULT: '#FECE7F',
          600: '#FDB035',
          700: '#E48D02',
          800: '#985E01',
          900: '#4C2F01',
          950: '#231600',
        },
        sportyblue: {
          50: '#EFF3F6',
          100: '#E2E9EE',
          200: '#C2D0DB',
          300: '#A5BACB',
          400: '#84A1B8',
          500: '#678AA7', // from theme
          DEFAULT: '#678AA7',
          600: '#4F6E88',
          700: '#3C5467',
          800: '#273744',
          900: '#151D24',
          950: '#090D10',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
