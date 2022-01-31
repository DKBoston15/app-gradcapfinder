import React from "react";
import ChangelogHeader from "../components/ChangelogComponents/ChangelogHeader";
import ChangelogCard from "../components/ChangelogComponents/ChangelogCard";

export default function changelog() {
  const changelogs = [
    {
      version: "Alpha v0.23",
      date: "Sunday, January 30th 2022",
      additions: ["Added a task completion sound effect"],
      fixes: [
        "Fixed a bug where you can create a task with no text, it will now show an error notification",
        "Fixed a bug where going over the display limit for tasks on the dashboard caused the whole section to be empty",
      ],
      improvements: [
        "Increased notification time to 5 seconds",
        "Changed notifications to a fully colored background to help them stand out more",
        "Tasks on the tasks page are not sorted chronologically",
        "Dashboard task view is now limited to 4 tasks",
      ],
    },
    {
      version: "Alpha v0.22",
      date: "Saturday, January 29th 2022",
      additions: [
        "Added simple task entrance animation",
        "Added a due date badge to each task with a due date",
        "Added an 'All Tasks' view",
      ],
      fixes: [
        "Fixed a bug with the task count leading to dashboard not showing a message when no tasks are present",
        "Updated Supabase integration to fix hot reloading",
      ],
      improvements: ["Updated changelog page to handle multiple entries"],
    },
    {
      version: "Alpha v0.21",
      date: "Saturday, January 29th 2022",
      additions: ["Added fireworks on task completion"],
      fixes: [
        "Fixed a bug causing tasks with due dates to not show up properly in the dashboard and Upcoming/Today views",
      ],
      improvements: [
        "Added a pointer and hover animation to the + Add Task button",
        "Added hover and color animation to task checkbox",
        "Aligned Add and Cancel buttons to the right when adding a task",
      ],
    },
  ];

  return (
    <div>
      <ChangelogHeader />
      <div className="flex flex-col items-center space-y-4 justify-center mt-4 p-4 lg:p-0 mb-8">
        {changelogs.map((changelog, index) => (
          <ChangelogCard key={index} changelog={changelog} />
        ))}
      </div>
    </div>
  );
}
