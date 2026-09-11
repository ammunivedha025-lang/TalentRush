/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        purplex: '#7c3aed',
        pinkx: '#ec4899',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(17,24,39,.08)',
      }
    },
  },
  plugins: [],
}