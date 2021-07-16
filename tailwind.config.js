module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#FA8503",
      secondary: "#ffed4a",
      background: "#023047",
      orangeHover: "#e37900",
      white: "#fff",
      gray: "#9CA3AF",
    }),
    textColor: {
      primary: "#FA8503",
      secondary: "#fff",
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
