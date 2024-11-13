/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    boxShadow: {
      md: '0 -1px 6.3px 0 rgba(0, 0, 0, 0.15)',
      sm: '0 -1px 12px 0 rgba(0, 0, 0, 0.04)',
    },
    extend: {
      fontFamily: {
        jalnan: ['Jalnan2'],
      },
      colors: {
        blue: {
          1: '#D9F1FE',
          2: '#B3DFFE',
          3: '#8CCAFE',
          4: '#70B6FD',
          5: '#4196FD',
          6: '#2F74D9',
          7: '#2056B6',
        },
        grey: {
          1: '#FBFBFB',
          2: '#F2F2F2',
          3: '#CBCBCB',
          4: '#ADADAD',
          5: '#8A8888',
          6: '#5E5E5E',
          7: '#3C3C3C',
        },
        red: {
          1: '#FF8E5D',
          2: '#FF5A28',
        },
        green: '#9CDE70',
      },
    },
  },
  plugins: [scrollbarHide],
}
