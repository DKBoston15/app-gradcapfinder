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
      slateGray: "#2a3033",
      whiteSmoke: "#f5f6f9",
      dimGray: "#54595c",
    }),
    textColor: {
      primary: "#FA8503",
      secondary: "#fff",
      background: "#023047",
      white: "#fff",
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
