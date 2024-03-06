/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors : {
              themeColor : "#0A3B4A",
              textColor : "#A6C7ED"
        }
    },
  },
  plugins: [],
}