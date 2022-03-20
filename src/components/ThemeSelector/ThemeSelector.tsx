import React, { useState, useEffect } from "react";
import { RgbaColorPicker } from "react-colorful";
import { SelectButton } from "primereact/selectbutton";
import { getLightTheme, getDarkTheme, getCustomTheme } from "../../themes";
import { useThemeStore } from "../../stores/theme";
import { RgbaColor } from "../../utils/utils.interfaces";
import { RGBAToHexA } from "../../utils/index";

const themeOptions = [
  { name: "Light", value: "lightThemeConfig" },
  { name: "Dark", value: "darkThemeConfig" },
  { name: "Custom", value: "customThemeConfig" },
];

export default function ThemeSelector() {
  const setTheme = useThemeStore((state: any) => state.setTheme);
  const [selectedMenuTheme, setSelectedMenuTheme] =
    useState("lightThemeConfig");
  const [color, setColor] = useState<RgbaColor>({
    r: 255,
    g: 255,
    b: 255,
    a: 0,
  });

  useEffect(() => {
    if (selectedMenuTheme === "lightThemeConfig") {
      setTheme(getLightTheme());
      setColor({ r: 255, g: 255, b: 255, a: 0 });
    }

    if (selectedMenuTheme === "darkThemeConfig") {
      setTheme(getDarkTheme());
      setColor({ r: 0, g: 0, b: 0, a: 1 });
    }

    if (selectedMenuTheme === "customThemeConfig") {
      setTheme(getCustomTheme(color));
    }
  }, [selectedMenuTheme]);

  useEffect(() => {
    if (selectedMenuTheme === "customThemeConfig") {
      setTheme(getCustomTheme(color));
      document.documentElement.style.setProperty(
        "--color-bg",
        RGBAToHexA(color.r, color.g, color.b, color.a)
      );
    }
  }, [color]);

  useEffect(() => {
    setColor({ r: 255, g: 255, b: 255, a: 0 });
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
      {selectedMenuTheme === "customThemeConfig" && (
        <RgbaColorPicker color={color} onChange={setColor} />
      )}
    </div>
  );
}
