import React from "react";
import { AiOutlineArrowsAlt, AiOutlineArrowLeft } from "react-icons/ai";

interface IHomePanel {
  setFullScreen(value: boolean): void;
  fullScreen: boolean;
  setShowThirdPanel(value: boolean): void;
  showThirdPanel: boolean;
}

export default function HomePanel({
  setFullScreen,
  fullScreen,
  showThirdPanel,
  setShowThirdPanel,
}: IHomePanel) {
  return (
    <div className="flex flex-grow justify-between min-h-screen">
      <AiOutlineArrowsAlt
        className="mt-5 ml-4 cursor-pointer"
        onClick={() => setFullScreen(!fullScreen)}
      />
      <AiOutlineArrowLeft
        className="mt-5 mr-4 cursor-pointer"
        onClick={() => setShowThirdPanel(!showThirdPanel)}
      />
    </div>
  );
}
