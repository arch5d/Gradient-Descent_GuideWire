/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#1e1b4b',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(99,102,241,0.18), 0 10px 40px rgba(37,99,235,0.18)',
      },
    },
  },
  plugins: [],
};
