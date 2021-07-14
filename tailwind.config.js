module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#3490dc",
      secondary: "#ffed4a",
      background: "#023047",
    }),
    textColor: {
      primary: "#3490dc",
      secondary: "#ffed4a",
      background: "#023047",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
