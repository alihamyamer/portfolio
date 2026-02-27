/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-orange': {
          DEFAULT: '#FFB380',
          '50': '#FFF5ED',
          '100': '#FFE5D4',
          '200': '#FFD4A3',
          '300': '#FFB380',
          '400': '#FF9F5C',
          '500': '#FF8C38',
        },
        dashboard: {
          bg: '#020617',
          accent: '#22c55e',
          card: 'rgba(15, 23, 42, 0.5)',
          'text': '#f8fafc',
          muted: '#94a3b8',
          live: '#22c55e',
        },
      },
    },
  },
  plugins: [],
}
