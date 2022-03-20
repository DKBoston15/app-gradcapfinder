import { RGBAToHexA } from "../utils";
import { getTextColor } from "../utils";
import { RgbaColor } from "../utils/utils.interfaces";

export function getLightTheme() {
  return {
    color: RGBAToHexA(236, 240, 241, 1),
    drawerColor: { r: 255, g: 255, b: 255, a: 1 },
    drawerTextColor: getTextColor({ r: 236, g: 240, b: 241, a: 1 }),
    textColor: getTextColor({ r: 236, g: 240, b: 241, a: 1 }),
    border: "2px solid black",
  };
}

export function getDarkTheme() {
  return {
    color: RGBAToHexA(25, 25, 25, 1),
    drawerColor: RGBAToHexA(25, 25, 25, 1),
    drawerTextColor: getTextColor({ r: 25, g: 25, b: 25, a: 1 }),
    textColor: getTextColor({ r: 25, g: 25, b: 25, a: 1 }),
    border: "2px solid white",
  };
}

export function getCustomTheme(color: RgbaColor) {
  console.log(`2px solid ${RGBAToHexA(color.r, color.g, color.b, color.a)}`);
  return {
    color: RGBAToHexA(color.r, color.g, color.b, color.a),
    drawerTextColor: getTextColor({ r: 236, g: 240, b: 241, a: 1 }),
    textColor: getTextColor({
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a,
    }),
    border: `2px solid ${RGBAToHexA(color.r, color.g, color.b, color.a)}`,
  };
}
