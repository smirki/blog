/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}', // Make sure tailwind scans your .jsx files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
