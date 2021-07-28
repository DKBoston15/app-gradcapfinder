import React from "react";
import { AiOutlineArrowsAlt, AiOutlineArrowLeft } from "react-icons/ai";

interface IHomePanelProps {
  setFullScreen(value: boolean): void;
  fullScreen: boolean;
  setShowThirdPanel(value: boolean): void;
  showThirdPanel: boolean;
}

export default function Chat({
  setFullScreen,
  fullScreen,
  showThirdPanel,
  setShowThirdPanel,
}: IHomePanelProps) {
  return (
    <div
      className={`flex flex-col h-min-full ${
        showThirdPanel ? "w-10/12" : "w-full"
      }`}
    ></div>
  );
}
