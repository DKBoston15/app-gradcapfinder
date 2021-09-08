import React from "react";
import Meetings from "./thirdPanelVariants/Meetings";

interface IThirdPanelProps {
  variant: String;
}

export default function ThirdPanel({ variant }: IThirdPanelProps) {
  if (variant === "Meetings") {
    return <div className="p-5">{/* <Meetings /> */}</div>;
  }
}
