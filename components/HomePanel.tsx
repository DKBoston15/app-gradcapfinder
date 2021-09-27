import React from "react"
import JournalsList from "./JournalsList"
import AuthorList from "./AuthorList"
import KeyTermList from "./KeyTermList"
import Hello from "./Hello"
import DailyAffirmation from "./DailyAffirmation"
import TasksDue from "./TasksDue"
import MeetingsToday from "./MeetingsToday"

export default function HomePanel({ user }: any) {
    return (
        <div className="w-full p-12 space-y-4">
            <div className="flex justify-between h-2/9">
                <Hello user={user} />
                <DailyAffirmation />
            </div>
            <div className="h-3/9 flex space-x-4">
                <TasksDue />
                <MeetingsToday />
            </div>
            <div className="flex space-x-4 h-4/9">
                <JournalsList />
                <AuthorList />
                <KeyTermList />
            </div>
        </div>
    )
}
