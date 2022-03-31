import { RGBAToHexA } from '../utils';
import { getTextColor } from '../utils';
import { RgbaColor } from '../utils/utils.interfaces';

export function getLightTheme() {
  return {
    color: '#fba538',
    patternColor1: `rgba(255, 255, 255, 1)`,
    patternColor2: `rgba(25, 25, 25, 0.1)`,
    drawerColor: { r: 255, g: 255, b: 255, a: 1 },
    drawerTextColor: getTextColor({ r: 236, g: 240, b: 241, a: 1 }),
    textColor: getTextColor({ r: 236, g: 240, b: 241, a: 1 }),
    coloredButtonText: getTextColor({ r: 236, g: 240, b: 241, a: 1 }),
    patternTextColor: getTextColor({ r: 236, g: 240, b: 241, a: 1 }),
    border: '2px solid black',
  };
}

export function getDarkTheme() {
  return {
    color: RGBAToHexA(25, 25, 25, 1),
    patternColor1: `rgba(255, 255, 255, 0.1)`,
    patternColor2: RGBAToHexA(25, 25, 25, 1),
    drawerColor: RGBAToHexA(25, 25, 25, 1),
    drawerTextColor: getTextColor({ r: 25, g: 25, b: 25, a: 1 }),
    textColor: getTextColor({ r: 25, g: 25, b: 25, a: 1 }),
    coloredButtonText: RGBAToHexA(25, 25, 25, 1),
    patternTextColor: getTextColor({ r: 25, g: 25, b: 25, a: 1 }),
    border: '2px solid white',
  };
}

export function getCustomTheme(color: RgbaColor) {
  return {
    patternColor1: `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`,
    patternColor2: `rgba(255, 255, 255, 0.1)`,
    color: RGBAToHexA(color.r, color.g, color.b, color.a),
    patternTextColor: RGBAToHexA(25, 25, 25, 1),
    drawerTextColor: getTextColor({ r: 236, g: 240, b: 241, a: 1 }),
    coloredButtonText: getTextColor({
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a,
    }),
    textColor: getTextColor({
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a,
    }),
    border: `2px solid ${RGBAToHexA(color.r, color.g, color.b, color.a)}`,
  };
}
