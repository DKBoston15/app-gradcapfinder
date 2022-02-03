import React from "react";
import ChangelogHeader from "../components/ChangelogComponents/ChangelogHeader";
import ChangelogCard from "../components/ChangelogComponents/ChangelogCard";

export default function changelog() {
  const changelogs = [
    {
      version: "Alpha v0.26",
      date: "Wednesday, February 2nd 2022",
      additions: [],
      fixes: [
        "Fixed date on dashboard to show a friendly date accurate to the local timezone of the user",
        "Changed the meetings view on the dashboard to remove meetings after the meeting end time, rather than the start time",
        "Resized the tasks due and meetings sections on the dashboard and there corresponding cards to better match and fit the recent changes",
        "Truncated project name on the dashboard for longer project names",
      ],
      improvements: [
        "Updated various section titles on the tasks page",
        "Adjusted sizing on the task sidebar to better accommodate longer titles",
        "Changed the project name on each card to 'General Task' when the task does not have an assigned project",
        "Renamed 'Tasks due soon' to 'Upcoming Tasks'",
        "Renamed 'Meetings today' to 'Upcoming Meetings'",
        "Added 24 new randomly selected aphorisms to the dashboard",
      ],
    },
    {
      version: "Alpha v0.25",
      date: "Tuesday, February 1st 2022",
      additions: [
        "Added a personal task folder",
        "Added a settings page with a sound effect setting",
        "Added a profile image icon in the top right of the dashboard with a dropdown menu for the settings page, changelog page, and ability to logout",
        "Added a link to the dashboard from the changelog page by clicking on the GradCapFinder logo",
      ],
      fixes: [],
      improvements: [
        "Meetings on the dashboard will now no longer be shown after the meeting time has passed",
        "Added the project name to the tasks due soon section of the dashboard",
      ],
    },
    {
      version: "Alpha v0.24",
      date: "Monday, January 31st 2022",
      additions: [
        "Added a join button to the next upcoming meeting card on the dashboard",
      ],
      fixes: [
        "Set default project to Inbox for preset views",
        "Fixed a bug where tasks on the dashboard were not being show in chronological order",
      ],
      improvements: [
        "Restyled the task cards on the dashboard to better fit the design and new 4 task limit",
        "Renamed Archived to All Archived Tasks",
        "Renamed All Tasks to All Current Tasks",
        "All meetings will be shown for admins",
      ],
    },
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
        "Tasks on the tasks page are now sorted chronologically",
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
