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
