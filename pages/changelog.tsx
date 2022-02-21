import React from "react";
import ChangelogHeader from "../components/ChangelogComponents/ChangelogHeader";
import ChangelogCard from "../components/ChangelogComponents/ChangelogCard";

export default function changelog() {
  const changelogs = [
    {
      version: "Alpha v0.34",
      date: "Monday, February 21st 2022",
      additions: [
        "Added an additional way of accessing the settings menu with a link above the logout button on the main navigation panel",
      ],
      fixes: [
        "Fixed a bug where on initial log in, dashboard data would not load",
        "Fixed a bug where completing a task would not remove it from the today view",
      ],
      improvements: [
        "Adding a simple responsive design to the dashboard and profile pages. NOTE: This is not fully functional, just an temporary step in the direction of a fully responsive design",
        "Added responsiveness to the feedback button",
      ],
    },
    {
      version: "Alpha v0.33",
      date: "Saturday, February 19th 2022",
      additions: [
        "Created an onboarding flow for users logging in for the first time",
        "Refactored the new profile page, adding additional fields about the user",
        "Added unread notifications for admin users",
      ],
      fixes: ["Fixed a bug where new quick tasks could not be created"],
      improvements: ["Redesigned the profile page"],
    },
    {
      version: "Alpha v0.32",
      date: "Tuesday, February 15th 2022",
      additions: [
        "Added a number next to Journals/Authors/Keywords to display the number of sub items underneath them",
        "Made the standard view task area on the sidebar collapsible like the project section",
        "Added a sound effect when a chat message is sent",
        "Added timestamps to chat messages",
        "Added a visual date separator to chat discussions",
      ],
      fixes: [
        "Removed confetti when archiving a task",
        "Overhauled all dates and times to show the dates based on the users current timezone",
      ],
      improvements: [
        "Refactored the design of the settings page and added some additional settings",
      ],
    },
    {
      version: "Alpha v0.31",
      date: "Sunday, February 13th 2022",
      additions: [
        "Added a Dissertation Tasks section",
        "Added sorting options to tasks",
        "Added a date filtering option to tasks",
      ],
      fixes: [
        "Fixed box sizing issue on dashboard for 1920x1080 viewpoint",
        "Fixed a bug where Tasks/Journals/Authors/Keyterms would not load initially on dashboard",
      ],
      improvements: [
        "Added a new task view for completed tasks",
        "Archiving a task and completing a task are now two different things",
        "Added an archive task button to the edit task view",
        "Renamed Inbox to Quick Tasks",
      ],
    },
    {
      version: "Alpha v0.30",
      date: "Thursday, February 10th 2022",
      additions: [
        "Replaced the third party chat system with a custom built chat better suited for the app",
        "Added a popup to allow users to provide feedback easily for bug tracking",
        "Added the ability to add links to journals, authors, and key terms",
        "Added the ability to add sub journals, authors, and key terms",
        "Added a setting for a dark mode. NOTE: Dark mode is still a work in progress",
      ],
      fixes: [
        "Truncated long project names on the task page and add task popup",
      ],
      improvements: [
        "Internal state management overhaul with a state management system. This increases responsiveness and allows for much faster development going forward",
        "Upcoming tasks both on the dashboard and task page now only show tasks due up to 7 days in the future",
        "Avatar/Profile dropdown added to every page",
        "Added an identicon to serve as a placeholder for users without a profile image",
        "Daneisms have been updated with new and improved messages",
      ],
    },
    {
      version: "Alpha v0.26",
      date: "Wednesday, February 2nd 2022",
      additions: [],
      fixes: [
        "Fixed date on dashboard to show a friendly date accurate to the local timezone of the user",
        "Changed the meetings view on the dashboard to remove meetings after the meeting end time, rather than the start time",
        "Resized the tasks due and meetings sections on the dashboard and their corresponding cards to better match and fit the recent changes",
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
