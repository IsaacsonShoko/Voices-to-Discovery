module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0A0F1E',
        parchment: '#F2EDE4',
        gold: '#C9A84C',
        forest: '#1A3A2F',
        clay: '#8B5E3C',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
