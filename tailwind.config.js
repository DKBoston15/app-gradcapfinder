module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "1/9": "11.1%",
        "3/9": "33.3%",
        "4/9": "44.4%",
      },
      width: {
        "90/100": "90%",
        115: "115px",
      },
      spacing: {
        240: "-24px",
        192: "48rem",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#ee803c",
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
      subtleOrange: "#fddfcb",
      aliceBlue: "#f1f4ff",
      silver: "#bdc3c7",
      snow: "#f7f7f7",
      keyTermBlue: "#eff8ff",
      authorOrange: "#fef2eb",
      hoverGray: "rgba(234, 234, 234, .75)",
      dashGray: "#eff2f4",
    }),
    textColor: {
      primary: "#FA8503",
      secondary: "#fff",
      background: "#023047",
      white: "#fff",
      gray: "#7d8083",
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      zoomBlue: "#4A8CFF",
      slateGray: "#2a3033",
      subtleOrange: "#fddfcb",
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
