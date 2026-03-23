/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        soft: '0 20px 45px rgba(37, 99, 235, 0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(29, 78, 216, 0.92), rgba(56, 189, 248, 0.82))',
      },
    },
  },
  plugins: [],
};
