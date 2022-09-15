/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/routes/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
