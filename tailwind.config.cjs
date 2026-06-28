module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8f1',
          100: '#fff0e1',
          200: '#ffd8b8',
          300: '#ffbf8f',
          400: '#ffb06a',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350e'
        },
        accent: '#e11d48',
        panel: '#0f1724'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        'lg-plus': '1rem'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
};
