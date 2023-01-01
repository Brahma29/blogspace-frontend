/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'navGreen': '#BBC399',
        'main': '#F7F6EF',
        'btnGreen': '#073627',
      },
      backgroundImage: {
        'overlay':
          'linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(1,2,3,0.9023984593837535) 81%)',
      },
    },
  },
  plugins: [],
};
