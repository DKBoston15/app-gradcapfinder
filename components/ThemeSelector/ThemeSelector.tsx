import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RgbaColorPicker } from "react-colorful";
import { SelectButton } from "primereact/selectbutton";
import useCurrentTheme from "../../hooks/useCurrentTheme";
import { getLightTheme, getDarkTheme, getCustomTheme } from "../../themes";
interface RgbColor {
  r: number;
  g: number;
  b: number;
}

interface RgbaColor extends RgbColor {
  a: number;
}

const getBrightness = ({ r, g, b }: RgbaColor) =>
  (r * 299 + g * 587 + b * 114) / 1000;

export function ThemeSelector({ setSelectedTheme }) {
  const [color, setColor] = useState<RgbaColor>({
    r: 255,
    g: 255,
    b: 255,
    a: 0,
  });

  const getTextColor =
    getBrightness(color) > 128 || color.a < 0.5 ? "#000" : "#FFF";
  const colorString = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a}`;
  const lightThemeConfig = {
    color: "#ffffff",
    border: "1px solid black",
  };

  const [selectedMenuTheme, setSelectedMenuTheme] =
    useState("lightThemeConfig");
  const themeOptions = [
    { name: "Light", value: "lightThemeConfig" },
    { name: "Dark", value: "darkThemeConfig" },
    { name: "Custom", value: "customThemeConfig" },
  ];

  useEffect(() => {
    if (selectedMenuTheme === "lightThemeConfig") {
      setSelectedTheme(getLightTheme());
      setColor({ r: 255, g: 255, b: 255, a: 0 });
    }

    if (selectedMenuTheme === "darkThemeConfig") {
      setSelectedTheme(getDarkTheme());
      setColor({ r: 0, g: 0, b: 0, a: 1 });
    }

    if (selectedMenuTheme === "customThemeConfig")
      setSelectedTheme(getCustomTheme(color));
  }, [selectedMenuTheme]);

  useEffect(() => {
    if (selectedMenuTheme === "customThemeConfig") {
      setSelectedTheme(getCustomTheme(color));
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

      {/* <ExampleButton
          label="Reset Color"
          color={colorString}
          textcolor={getTextColor}
          onClick={() => console.log("Button Click")}
        /> */}
    </div>
  );
}
