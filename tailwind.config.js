module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#ee803c",
      },
      zIndex: {
        75: 75,
      },
      brightness: {
        25: ".25",
      },
      height: {
        "9/100": "9%",
        "3/9": "33.3%",
        "4/9": "44.4%",
        "92/100": "92%",
        "90/100": "90%",
        "85/100": "85%",
        "3/5": "60%",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
      width: {
        "90/100": "90%",
        115: "115px",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
      spacing: {
        240: "-24px",
        192: "48rem",
        "80%": "80%",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#ee803c",
      background: "#023047",
      orangeHover: "#e37900",
      white: "#fff",
      gray: "#9CA3AF",
      slateGray: "#2a3033",
      logOutBG: "#221e25",
      aliceBlue: "#f1f4ff",
      silver: "#bdc3c7",
      snow: "#f7f7f7",
      keyTermBlue: "#eff8ff",
      authorOrange: "#fef2eb",
      hoverGray: "rgba(234, 234, 234, .75)",
      dashGray: "#eff2f4",
      porcelain: "#eff2f4",
      green: "#2ecc71",
      gcfBlue: "#2980b9",
      darkSlateGray: "#2c2724",
      black: "#121212",
      completeBlack: "#000",
      onboardingBG: "#FFBB92",
      whiteSmoke: "#f4f7f8",
    }),
    textColor: {
      primary: "#FA8503",
      secondary: "#fff",
      background: "#023047",
      white: "#fff",
      gray: "#7d8083",
      blue: "#5297ff",
      green: "#24b84c",
      purple: "#a971ff",
      gcfBlue: "#2980b9",
      turq: "#1abc9c",
      carrot: "#e67e22",
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      primary: "#ee803c",
      subtleOrange: "#fddfcb",
      gray: "#d6d6d6",
      thumbnailTopOne: "#f8f9fa",
      thumbnailTopTwo: "#f1f3f5",
      blue: "#5297ff",
      gcfBlue: "#2980b9",
      dashGray: "#eff2f4",
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
