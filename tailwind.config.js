/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
        },
        secondary: {
          DEFAULT: '#666666',
        },
        'regal-navy': '#0E3572',
      },
      backgroundImage: {
        'button-gradient': 'radial-gradient(64.25% 75% at 53.5% 0.93%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%), #0E3572',
      },
      borderRadius: {
        'button': '4px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

