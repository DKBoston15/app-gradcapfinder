import { useState, useEffect } from 'react';
import { RgbaColorPicker } from 'react-colorful';
import { SelectButton } from 'primereact/selectbutton';
import { getLightTheme, getDarkTheme, getCustomTheme } from '../../themes';
import { useThemeStore } from '../../stores/theme';
import { RgbaColor } from '../../utils/utils.interfaces';
import { RGBAToHexA, RGBToHSL } from '../../utils/index';

const themeOptions = [
  { name: 'Light', value: 'lightThemeConfig' },
  { name: 'Dark', value: 'darkThemeConfig' },
  { name: 'Custom', value: 'customThemeConfig' },
];

export default function ThemeSelector() {
  const setTheme = useThemeStore((state: any) => state.setTheme);
  const [selectedMenuTheme, setSelectedMenuTheme] = useState('lightThemeConfig');
  const [color, setColor] = useState<RgbaColor>({
    r: 255,
    g: 255,
    b: 255,
    a: 0,
  });

  useEffect(() => {
    if (selectedMenuTheme === 'lightThemeConfig') {
      setTheme(getLightTheme());
      setColor({ r: 255, g: 255, b: 255, a: 0 });
    }

    if (selectedMenuTheme === 'darkThemeConfig') {
      setTheme(getDarkTheme());
      setColor({ r: 0, g: 0, b: 0, a: 1 });
    }

    if (selectedMenuTheme === 'customThemeConfig') {
      setTheme(getCustomTheme(color));
    }
  }, [selectedMenuTheme]);

  useEffect(() => {
    if (selectedMenuTheme === 'customThemeConfig') {
      setTheme(getCustomTheme(color));
      document.documentElement.style.setProperty(
        '--color-bg',
        RGBAToHexA(color.r, color.g, color.b, color.a),
      );
      document.documentElement.style.setProperty(
        '--primary-color',
        RGBAToHexA(color.r, color.g, color.b, color.a),
      );
      document.documentElement.style.setProperty('--color-closeIcon', 'black');
      document.documentElement.style.setProperty(
        '--hover-color',
        RGBToHSL(color.r, color.g, color.b),
      );
    }
    if (selectedMenuTheme === 'lightThemeConfig') {
      document.documentElement.style.setProperty('--color-bg', '#fba538');
      document.documentElement.style.setProperty('--primary-color', '#fba538');
      document.documentElement.style.setProperty('--color-closeIcon', 'black');
    }
    if (selectedMenuTheme === 'darkThemeConfig') {
      document.documentElement.style.setProperty('--color-bg', '#fba538');
      document.documentElement.style.setProperty('--primary-color', '#fba538');
      document.documentElement.style.setProperty('--color-closeIcon', 'white');
    }
  }, [color]);

  useEffect(() => {
    setColor({ r: 255, g: 255, b: 255, a: 0 });
    setTheme(getLightTheme());
  }, []);

  return (
    <div>
      <SelectButton
        value={selectedMenuTheme}
        options={themeOptions}
        onChange={(e) => {
          setSelectedMenuTheme(e.value);
        }}
        optionLabel="name"
      />
      {selectedMenuTheme === 'customThemeConfig' && (
        <RgbaColorPicker color={color} onChange={setColor} />
      )}
    </div>
  );
}
