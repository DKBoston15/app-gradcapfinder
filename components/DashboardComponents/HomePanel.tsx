import React from "react";
import JournalsList from "./JournalComponents/JournalsList";
import AuthorList from "./AuthorComponents/AuthorList";
import KeyTermList from "./KeyTermComponents/KeyTermList";
import Hello from "./Hello";
import DailyAffirmation from "./DailyAffirmation";
import TasksDue from "./TaskListComponents/TasksDue";
import MeetingsToday from "./MeetingsComponents/MeetingsToday";

export default function HomePanel({ setCurrentPage }: any) {
  return (
    <div className="w-full p-12 space-y-4">
      {/* @ts-ignore */}
      <div className="flex justify-between h-2/9 intro">
        <Hello />
        <DailyAffirmation />
        {/* <span className="relative inline-block">
          <img
            className="inline object-cover w-16 h-16 mr-2 rounded-full"
            src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Profile image"
          />
          <span className="absolute right-4 text-white inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full">
            ^
          </span>
        </span> */}
      </div>
      <div className="h-3/9 flex space-x-4">
        <TasksDue setCurrentPage={setCurrentPage} />
        <MeetingsToday setCurrentPage={setCurrentPage} />
      </div>
      <div className="flex space-x-4 h-4/9 lists">
        <JournalsList />
        <AuthorList />
        <KeyTermList />
      </div>
    </div>
  );
}
