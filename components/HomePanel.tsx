import React from "react";
import { AiOutlineArrowsAlt, AiOutlineArrowLeft } from "react-icons/ai";
import DailyAffirmation from "./DailyAffirmation";
import JournalsList from "./JournalsList";
import AuthorList from "./AuthorList";

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
  const date = new Date();

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
        <div className="flex h-72 justify-between">
          <div className="text-xl text-center justify-center w-full">
            Hi Dakota, Welcome Back!
            <br />
            {date.toDateString()}
          </div>
          <div className="w-full text-center text-xl">
            Daily Affirmation
            <br />
            <br />
            <DailyAffirmation />
          </div>
        </div>
        <div className="flex flex-grow justify-between">
          <div>Due Dates</div>
          <div>Next Meeting</div>
        </div>
        <div className="flex flex-grow justify-between">
          <div>
            <JournalsList />
          </div>
          <div>
            <AuthorList />
          </div>
          <div>Key Terms</div>
        </div>
      </div>
    </div>
  );
}
