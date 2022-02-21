import React from "react";
import JournalsList from "./JournalComponents/JournalsList";
import AuthorList from "./AuthorComponents/AuthorList";
import KeyTermList from "./KeyTermComponents/KeytermsList";
import Hello from "./Hello";
import DailyAffirmation from "./DailyAffirmation";
import TasksDue from "./TaskListComponents/TasksDue";
import MeetingsToday from "./MeetingsComponents/MeetingsToday";
import Dropdown from "../Dropdown";
import { supabaseClient } from "../../lib/client";

export default function HomePanel({ setCurrentPage }: any) {
  const user = supabaseClient.auth.user();

  return (
    <div className="w-full p-12 space-y-4 h-full">
      <div className="flex flex-col xl:flex-row space-x-4 space-y-4 xl:space-y-0 justify-between h-2/9 intro">
        <Hello />
        <DailyAffirmation />
        <div className="absolute right-4 top-4">
          <Dropdown setCurrentPage={setCurrentPage} user={user} />
        </div>
      </div>
      <div className="xl:h-3/9 flex flex-col xl:flex-row xl:space-x-4 space-y-4 xl:space-y-0">
        <TasksDue setCurrentPage={setCurrentPage} />
        <MeetingsToday setCurrentPage={setCurrentPage} />
      </div>
      <div className="flex flex-col xl:flex-row xl:space-x-4 space-y-4 xl:space-y-0 h-3/9">
        <JournalsList />
        <AuthorList />
        <KeyTermList />
      </div>
    </div>
  );
}
