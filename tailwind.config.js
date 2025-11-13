// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
