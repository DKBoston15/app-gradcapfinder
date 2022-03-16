import { RGBAToHexA } from "../utils";

export function getLightTheme() {
  return {
    color: "#ecf0f1",
    border: "1px solid black",
  };
}

export function getDarkTheme() {
  return {
    color: "#191919",
  };
}

export function getCustomTheme(color) {
  return {
    color: RGBAToHexA(color.r, color.g, color.b, color.a),
    border: `1px solid ${RGBAToHexA(color.r, color.g, color.b, color.a)}`,
  };
}
