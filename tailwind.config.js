const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.js',
    './public/index.html'
  ],
  theme: {
    screens: {
      xs: '380px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: '#F8F9FC',
        secondary: '#f2f2f2',
        accent: '#FFFFFF',
        background: '#f2f2f2',
        textPrimary: '#551FFF',
        textSecondary: '#D0D2DA',
        textBackground: '#F3F0FF',
        textAccent: 'text-gray-600',
        highlight: '#D0D2DA'
      }
    }
  }
  // ...
}
