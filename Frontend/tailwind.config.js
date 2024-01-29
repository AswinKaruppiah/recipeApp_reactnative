/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poplight: ["PopLight"],
        PopRegular: ["PopRegular"],
        PopMedium: ["PopMedium"],
      },
    },
  },
  plugins: [],
};
