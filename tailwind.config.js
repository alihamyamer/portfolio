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
          bg: '#f1f5f9',
          accent: '#16a34a',
          card: '#ffffff',
          'text': '#1e293b',
          muted: '#64748b',
          live: '#16a34a',
        },
      },
    },
  },
  plugins: [],
}
