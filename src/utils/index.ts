import { RgbaColor } from './utils.interfaces';

export function log(value: any) {
  console.log(value);
}

export function RGBAToHexA(
  r: string | number,
  g: string | number,
  b: string | number,
  a: any
) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  if (a.length == 1) a = '0' + a;

  return '#' + r + g + b + a;
}

export function getBrightness({ r, g, b }: RgbaColor) {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export function getTextColor(color: RgbaColor) {
  const brightness =
    getBrightness(color) > 128 || color.a < 0.5 ? '#000' : '#FFF';
  return brightness;
}
