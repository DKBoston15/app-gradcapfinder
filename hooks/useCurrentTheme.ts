import { useState, useEffect } from "react";
import { getLightTheme } from "../themes";

export default function useCurrentTheme() {
  const [selectedTheme, setSelectedTheme] = useState(getLightTheme());
  useEffect(() => {
    console.log(selectedTheme);
  }, [selectedTheme]);

  return [selectedTheme, setSelectedTheme];
}
