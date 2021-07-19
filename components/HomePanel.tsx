import React from "react";
import { AiOutlineArrowsAlt, AiOutlineArrowLeft } from "react-icons/ai";

interface IHomePanelProps {
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
}: IHomePanelProps) {
  return (
    <div
      className={`flex flex-col h-min-full ${
        showThirdPanel ? "w-10/12" : "w-full"
      }`}
    >
      <div className="flex justify-between">
        <AiOutlineArrowsAlt
          className="mt-5 ml-4 cursor-pointer"
          onClick={() => setFullScreen(!fullScreen)}
        />
        <AiOutlineArrowLeft
          className={`mt-5 mr-4 cursor-pointer transition duration-250 ease-in-out ${
            showThirdPanel ? "transform rotate-180" : ""
          }`}
          onClick={() => setShowThirdPanel(!showThirdPanel)}
        />
      </div>
      <div className="flex flex-col h-full p-10">
        <div className="bg-primary flex h-72 justify-between">
          <div>Hi Dakota, Welcome Back!</div>
          <div>Daily Affirmation</div>
        </div>
        <div className="bg-dimGray flex flex-grow justify-between">
          <div>Due Dates</div>
          <div>Next Meeting</div>
        </div>
        <div className="bg-orangeHover flex flex-grow justify-between">
          <div>Journals</div>
          <div>Authors</div>
          <div>Key Terms</div>
        </div>
      </div>
    </div>
  );
}
