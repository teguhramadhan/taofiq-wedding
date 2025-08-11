/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        italianno: "var(--font-italianno)",
        cinzelDecorative: ["'Cinzel Decorative'", "cursive"],
        cinzel: ["'Cinzel'", "serif"],
        inter: "var(--font-inter)",
      },
    },
  },
  plugins: [],
};
