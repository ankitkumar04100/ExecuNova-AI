/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          900: '#1E1E2F',
          800: '#3B3B6B',
        },
        purple: {
          900: '#4F46E5',
          800: '#7C3AED',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
