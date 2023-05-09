/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Josefin: "Josefin Sans",
    },
    extend: {
      colors: {
        main: "#BAD7DF",
        secondary: "#0e9507b3",
        open: "#23211f",
        darkWhite: "#f6f6f6",
      },
      keyframes: {
        moveLeft: {
          "0%": { translate: "2000px" },
          "100%": { translate: "initial" },
        },
      },
      animation: {
        "waving-left": "moveLeft 2s   forwards",
      },
    },
  },
  plugins: [],
};
