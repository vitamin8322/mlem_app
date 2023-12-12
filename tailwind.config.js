/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    // "./src/screens/**/*.{js,ts,jsx,tsx}",
    // "./src/screens/*.{js,ts,jsx,tsx}",
    // "./pages/**/*.{js,ts,jsx,tsx}",
    // "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        purple: '#7D5DEE',
        purple80: '#DDD3FF',
        faqHeader: '#E9E9E9',
        orange: '#FE7A3E'
      },
    },
  },
  plugins: [],
}

