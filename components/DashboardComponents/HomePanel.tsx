import React from "react";
import JournalsList from "./JournalComponents/JournalsList";
import AuthorList from "./AuthorComponents/AuthorList";
import KeyTermList from "./KeyTermComponents/KeyTermList";
import Hello from "./Hello";
import DailyAffirmation from "./DailyAffirmation";
import TasksDue from "./TaskListComponents/TasksDue";
import MeetingsToday from "./MeetingsComponents/MeetingsToday";
import Dropdown from "../Dropdown";
import { supabaseClient } from "../../lib/client";

export default function HomePanel({ setCurrentPage }: any) {
  const user = supabaseClient.auth.user();

  return (
    <div className="w-full p-12 space-y-4">
      <div className="flex justify-between h-2/9 intro">
        <Hello />
        <DailyAffirmation />
        <div className="absolute right-4 top-4">
          <Dropdown setCurrentPage={setCurrentPage} user={user} />
        </div>
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
