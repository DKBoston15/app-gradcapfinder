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
      zoomBlue: "#4A8CFF",
      zoomBlueHover: "#4a8ce6",
      modalBackdrop: "rgba(0,0,0,0.5)",
      logOutBG: "#221e25",
    }),
    textColor: {
      primary: "#FA8503",
      secondary: "#fff",
      background: "#023047",
      white: "#fff",
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      zoomBlue: "#4A8CFF",
      slateGray: "#2a3033",
    }),
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
