/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/routes/**/*.tsx',
    './src/components/**/*.tsx',
    './../dynamodb-blog/src/components/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
