/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: '#EB5E28',
        primaryhover: '#C9400A',
        secondary: '#252422',
        secondaryhover: '#191918',
        danger: '#dc3545',
        third: '#403D39',
        fourth: '#CCC5B9',
        fifth:'#FFFCF2',
        sixth:'#423E28',
        seventh: '#B57F50',
      },
      fontFamily: {
        sans: ['sans-serif'],
      },
    },
  },
  plugins: [],
}

