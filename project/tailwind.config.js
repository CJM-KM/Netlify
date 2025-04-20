/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        indigo: {
          900: '#1E3A8A',
          800: '#2F4BA0',
          700: '#3D5CBC',
          600: '#4B6FD7',
          500: '#5984F1',
          400: '#6F9DF5',
          300: '#86B5F8',
          200: '#9DCEFB',
          100: '#B4E7FE',
          50: '#EBFBFF',
        },
        coral: {
          900: '#932F2F',
          800: '#AD3A3A',
          700: '#C64D4D',
          600: '#E06060',
          500: '#F97066',
          400: '#FF8C8C',
          300: '#FFA7A7',
          200: '#FFC2C2',
          100: '#FFDEDE',
          50: '#FFF5F5',
        },
        green: {
          900: '#014737',
          800: '#03543F',
          700: '#046C4E',
          600: '#057A55',
          500: '#0E9F6E',
          400: '#31C48D',
          300: '#84E1BC',
          200: '#BCF0DA',
          100: '#DEF7EC',
          50: '#F3FAF7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};