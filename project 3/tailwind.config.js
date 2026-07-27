/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: '#C7B9AB',
          light: '#D8CFC4',
          dark: '#A89B8C',
          soft: '#EDE8E2',
        },
        red: {
          DEFAULT: '#C30D23',
          dark: '#9A0A1C',
        },
        graphite: {
          DEFAULT: '#3E3A39',
          light: '#5A5552',
          dark: '#2A2726',
        },
      },
      fontFamily: {
        display: ['"TENET Sans Semi Expanded"', '"Segoe UI"', 'sans-serif'],
        heading: ['"TENET Sans Bold"', '"Segoe UI"', 'sans-serif'],
        body: ['"TENET Sans Regular"', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: {
        content: '1320px',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out both',
        'fade-up': 'fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in': 'slideIn 0.8s ease-out both',
        'ken-burns': 'kenBurns 20s ease-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translateX(0)' },
          '100%': { transform: 'scale(1.08) translateX(-1%)' },
        },
      },
    },
  },
  plugins: [],
};
