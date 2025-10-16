module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D62828', // Red
        },
        secondary: {
          DEFAULT: '#F7CAC9', // Mild Pink
        },
        background: '#F5F5DC', // Beige
      }
    }
  }
}