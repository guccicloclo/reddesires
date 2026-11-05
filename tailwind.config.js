/** Palette : noir profond, crème, accents bordeaux et doré */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0e0c0d', soft: '#1a1617', line: '#2b2526' },
        cream: { DEFAULT: '#f5eee2', dim: '#d9cfbf' },
        wine: { DEFAULT: '#6e1423', light: '#8c1d31' },
        gold: { DEFAULT: '#b8975a', light: '#d2b27a' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
      },
      animation: {
        'fade-up': 'fadeUp .7s ease-out both',
        'fade-in': 'fadeIn .6s ease-out both',
      },
    },
  },
  plugins: [],
}
