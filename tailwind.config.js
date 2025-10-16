module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quad-red': '#D62828',
        'quad-pink': '#F7CAC9',
        'quad-beige': '#F5F5DC',
      },
      borderColor: theme => ({
        'border': theme('colors.quad-red'),
      }),
    },
  },
  plugins: [],
}
