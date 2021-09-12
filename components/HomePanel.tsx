import React from "react";
import JournalsList from "./JournalsList";
import AuthorList from "./AuthorList";
import KeyTermList from "./KeyTermList";
import Hello from "./Hello";
import DailyAffirmation from "./DailyAffirmation";

export default function HomePanel({ user }: any) {
  return (
    <div className="w-full p-24">
      <div className="flex justify-between">
        <Hello user={user} />
        <DailyAffirmation />
      </div>
    </div>
  );
}
