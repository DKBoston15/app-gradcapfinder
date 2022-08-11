import React from 'react';
import ChangelogHeader from '@app/components/Changelog/ChangelogHeader/ChangelogHeader';
import ChangelogCard from '@app/components/Changelog/ChangelogCard/ChangelogCard';
import { Container } from './styles/changelog.styles';

export default function Changelog() {
  const changelogs = [
    {
      version: 'Beta v0.22',
      date: 'Tuesday, July 26th 2022',
      additions: [
        'Massive content addition in the Knowledge Base (formerly learn) section',
        'Added ability to duplicate items',
        'Added ability to delete items',
      ],
      fixes: [],
      improvements: [
        'Redesigned core project/component selection pages, adding 4 individual pages to reduce travel time',
        'Reduced core component form field sizes',
        'Redesigned projects to be more of a secondary component rather than the primary organization method',
        'Notes are now collapsible',
        'Increased the note font size',
      ],
    },
    {
      version: 'Beta v0.21',
      date: 'Friday, July 15th 2022',
      additions: [
        'Added a new popup asking if you want to change the page when there are unsaved notes',
      ],
      fixes: [
        'Fixed bug preventing the addition of a Sample or a Key Term',
        'Fixed the feedback button not being visible',
      ],
      improvements: [],
    },
    {
      version: 'Beta v0.2',
      date: 'Tuesday, July 12th 2022',
      additions: [
        'Implemented a global search activated by pressing CMD/CTRL + K or clicking on the search bar',
        'More learn content',
      ],
      fixes: [
        'Changed Sampling to Samples',
        'Learn grammatical errors',
        'Fixed issue where you could not write a new project objective',
        'Removed input mask from task time field now allowing any input in the cell',
      ],
      improvements: [
        'Overhauled navigation',
        'Renamed Google Scholar Citation to Google Scholar Label',
        'Reordered project and learn section navigation',
        'Replaced the date/time picker for tasks with a better more consistent one',
        'Added a dedicated navigation link for task metrics',
      ],
    },
    {
      version: 'Beta v0.16',
      date: 'Thursday, June 30th 2022',
      additions: ['Added multiple column sorting support'],
      fixes: [
        'Fixed connected authors, journals, and key terms not updating properly when switching between items',
        'Temporarily removed filter by date functionality from tasks table',
        'Fixed incorrect project deletion modal',
        'Fixed incorrect item deletion modals',
        'Fixed bug preventing the deletion of a project',
      ],
      improvements: ['Updated learn content'],
    },
    {
      version: 'Beta v0.15',
      date: 'Sunday, June 26th 2022',
      additions: [
        'Added an orange open task badge with the number of open tasks on the task view tab in projects',
        'More learn content!',
      ],
      fixes: [
        'Fixed incorrect sorting for priorities',
        'Removed unusable row reorder as it is not really compatible with filtering and sorting',
        'Fixed due dates not being populated in the edit fields for tasks',
        'Fixed incorrect date sorting for tasks',
        'Fixed inability to clear fields for tasks',
        'Fixed military/civilian time differences for tasks',
        'Fixed bug where you could not complete a task that had been previously completed',
        'Replaced a hyphen with an em dash between page numbers in the literature reference section',
        'Fixed inability to italicize text in notes and tasks',
        'Fixed mobile navigation project menu being blank',
        'Fixed issue where switching tabs would cause the app to redirect',
      ],
      improvements: [
        'Refactored the majority of the data persistence on the backend to resolve data loading/switching issues. In general, everything should be much faster and more efficient',
        'Replaced task priority labels with P1, P2, P3, P4',
        'Improved logic between selecting a project and a corresponding item in a task',
        'Moved task edit confirm and cancel icons to the left to make them more accessible on smaller screens',
        'Added green and red colors to confirm and cancel task edit options',
      ],
    },
    {
      version: 'Beta v0.1',
      date: 'Sunday, June 19th 2022',
      additions: [
        'Added Bi-Annually and Thricely as journal publication frequency options',
        'Updated learn sections with more content',
      ],
      fixes: ['Numerous data loading issues'],
      improvements: [
        'Complete overhaul of the task system',
        'Tasks and Notes are now two separate entities',
        'Added various levels of data persistence to reduce server loads and allow for faster loading',
        'Changed the (Add a team member here prompt) on the project overview page to be button',
        'Added active item navigation highlighting',
        'Improved responsive sizing generally, and specifically for MBP 13in resolutions',
      ],
    },
    {
      version: 'Alpha v1.26',
      date: 'Sunday, June 12th 2022',
      additions: ['Added user tutorial flows for dashboard, project, and task pages.'],
      fixes: [
        'Fixed bug where main navigation bar took up the entire screen in the Safari browser.',
      ],
      improvements: ['Updated content in learn section'],
    },
    {
      version: 'Alpha v1.25',
      date: 'Saturday, June 11th 2022',
      additions: [],
      fixes: [
        'Fixed the avatar image reloading everytime a page was changed',
        'Fixed a bug where the primary tag would not update live when the primary checkbox was checked',
        'Fixed mobile bug where there were two sections buttons on the project overview page',
        'Fixed a bug where the prompt to add a team member on the project overview page was partially cut off',
        'Primary checkboxes and the label text are now vertically aligned',
        'Fixed a bug where navigation scroll bars were appearing when they were not needed',
      ],
      improvements: [
        'Migrated domain from quester.tech to app.quester.tech',
        'Adjusted tablet/mobile sized breakpoint to flow in a smoother manner',
        'Updated the app-wide font from Poppins to Open Sans',
        'Links to the roadmap and changelog now open in a new tab',
      ],
    },
    {
      version: 'Alpha v1.24',
      date: 'Friday, June 10th 2022',
      additions: [
        'Added a link to the public roadmap and changelog inside the notification bell',
        'Added a button to add a teammate when the project team section is empty',
      ],
      fixes: ['Fixed a bug where changing tabs would cause the app to redirect to the dashboard'],
      improvements: [],
    },
    {
      version: 'Alpha v1.23',
      date: 'Thursday, June 9th 2022',
      additions: [
        'Replaced the project description field with 3 unique fields for objectives, activities, and products',
        'Added primary checkboxes to key term, journal, and author project pages',
        'Added an orange primary tag indicator to primary key terms, journals, and authors',
        'Added an All/Primary switch to the project search navigation bar for key terms, journals, and authors pages',
      ],
      fixes: [
        'Made some minor copy and loading improvements for brand new users on their first login',
        'Italicized volume number in literature references',
      ],
      improvements: [
        'Migrated domain from app.gradcapfinder.com to quester.tech',
        'Added a placeholder message on the task overview page to replace the tasks completed over time metric until a few completed tasks show up',
      ],
    },
    {
      version: 'Alpha v1.22',
      date: 'Friday, June 3rd 2022',
      additions: [
        'Added a new profile field for academic status',
        'Added a project badge to each task on the task page',
        'Added a bell icon and notification system',
      ],
      fixes: [
        'Fixed a bug where tasks on the upcoming tasks section of a project overview page would not update when deleted or completed',
        'Fixed several task bugs where completing or deleting a task would redirect the user or load the wrong list of tasks',
      ],
      improvements: [
        `Renamed Articles to Literature to better represent the section's purpose`,
        'Several literature reference generator updates',
      ],
    },
    {
      version: 'Alpha v1.21',
      date: 'Friday, May 20th 2022',
      additions: [],
      fixes: [
        'Fixed a bug where changing the users university did not save',
        'Fixed bug where delete project did not properly adjust the UI to the next available project',
        'Fixed bug where adding a new project does not properly update the UI',
        'Added a UI for when no projects are present to prompt you to create one',
        'Handle UI when all projects are deleted/completed/archived',
        'Fix start date for project not updating',
        'Fix colored background height on project overview page',
        'Fix default project start date on project creation',
        'Fixed bug where switching between projects and/or reloading the page would show the wrong items in the project item list bar',
        'Fixed bug where editing a task did not save',
        'Fixed bug where deleting a task did not update the UI without a refresh',
        'Fixed bug where completing a task did not update the UI without a refresh',
        'Removed task edit options from completed tasks',
        'Removed task quick link for personal tasks',
        'Fixed bug where updating a personal task did not save properly',
        'Fixed a bug where the key term name was not showing up at the top of the feed view',
      ],
      improvements: ['Added a dedicated close button to the feedback popup'],
    },
    {
      version: 'Alpha v1.2',
      date: 'Tuesday, May 17th 2022',
      additions: [],
      fixes: [],
      improvements: [
        'Complete mobile overhaul to make the app fully functional on mobile devices. There is still lots of work to be done to make it a great experience, but it is functional!',
      ],
    },
    {
      version: 'Alpha v1.17',
      date: 'Sunday, May 15th 2022',
      additions: [
        'Added an easy to access edit icon to the project description section',
        'Added a Project Description header to the project description section',
      ],
      fixes: ['Fixed a bug where the key term name was not populating in the name field'],
      improvements: [
        'Added auto-formatting to phone number input field 999-999-9999',
        'Renamed the Rename Project button to Edit Project Info',
      ],
    },
    {
      version: 'Alpha v1.16',
      date: 'Sunday, May 15th 2022',
      additions: [
        'Added a tooltip to chip inputs (authors) explaining that you can add multiple authors by hitting enter',
        'Added the created at date to the note/task cards',
      ],
      fixes: ['Added more spacing to link fields to prevent label overlap'],
      improvements: [
        'Fixed note/task formatting not working in already saved notes',
        'Switched Create and Cancel button locations on add item dialog',
        'Redesigned the project info UI again',
        'Increased note and task default font size',
      ],
    },
    {
      version: 'Alpha v1.15',
      date: 'Wednesday, May 11th 2022',
      additions: ['Replaced the login graphic with a new Quester name graphic'],
      fixes: [
        'Enabled scrolling on the details panel for small window sizes',
        'Text now properly wraps in the navigation bars for longer item titles',
        'Fixed cutoff text in the project feed header',
      ],
      improvements: [
        'Moved the All Completed Tasks metric to the end of the row',
        'Changed Publication Frequency from a text field to a dropdown with pre-determined options',
        'Renamed the key term field title to name',
        'Added a button to all project item link fields to quickly go to entered links',
        'Added the project description to the project overview info panel',
        'Removed the end date field from project info',
      ],
    },
    {
      version: 'Alpha v1.10',
      date: 'Tuesday, May 10th 2022',
      additions: [
        'Added a learn page will be populated over time with numerous resources and content to help users learn more about the concepts they are trying to accomplish',
      ],
      fixes: [],
      improvements: ['Adjusted the project info UI'],
    },
    {
      version: 'Alpha v1.01',
      date: 'Wednesday, May 4th 2022',
      additions: ['Added notifications for the completion and deletion of tasks'],
      fixes: [],
      improvements: [],
    },
    {
      version: 'Alpha v1.0',
      date: 'Wednesday, May 4th 2022',
      additions: [
        'Complete ground up rebuild of the app. Including a new layout, new direction, and project focused orientation.',
        'Introduction of the projects tab for managing and tracking your research projects',
        'Revised task page which provides an overview of the project connected tasks and allows for personal tasks',
        'Complete re-branding under the new app name of Quester!',
      ],
      fixes: [],
      improvements: [],
    },
    {
      version: 'Alpha v0.5',
      date: 'Tuesday, March 15th 2022',
      additions: [
        'Added an articles page for managing all of your articles',
        'Disabled Chat within the application. There are significant issues that will be addressed during the Alpha V1 rebuild.',
      ],
      fixes: [
        'Fixed bug where you were unable to add a new task',
        'Fixed misaligned and sized UI on the task page',
      ],
      improvements: ["Added University of Hawai'i at Manoa to the university list"],
    },
    {
      version: 'Alpha v0.4',
      date: 'Tuesday, March 1st 2022',
      additions: [
        'Added an export tasks by view to CSV button',
        'Added an export all tasks to CSV button',
        'Added a resource page with a ton of new information',
        'Added buttons and relevant UI to toggle showing completed and archived tasks',
        'Most recent discussion message will now show up on the chat sidebar',
      ],
      fixes: [
        'Fixed the CV upload button so that it now works',
        'Fixed long chat messages wrapping incorrectly and making it difficult to read',
      ],
      improvements: ['Sign in page is now compatible with dark mode'],
    },
    {
      version: 'Alpha v0.37',
      date: 'Wednesday, February 23rd 2022',
      additions: [],
      fixes: [
        'Fixed bug where switching the dark mode toggle would not change any page other than the settings to dark mode',
        'Fixed a bug where upon logging in, a user might end up stuck with a loading symbol',
        'Fixed a bug where the university selector had all options selected on initial load',
      ],
      improvements: ['Sorted the university selector alphabetically'],
    },
    {
      version: 'Alpha v0.36',
      date: 'Wednesday, February 23rd 2022',
      additions: [
        'Added tooltips in various places throughout the app to provide additional context',
        'Added additional universities to the university selection list',
      ],
      fixes: ['Fixed an issue where realtime updates would not always populate'],
      improvements: [
        'Redesigned and added support for dark mode throughout the entire application',
        'The profile page will now auto-save changes',
      ],
    },
    {
      version: 'Alpha v0.35',
      date: 'Tuesday, February 22nd 2022',
      additions: [
        'Added additional information fields for journals, authors, and keyterms',
        'Added additional information fields for subjournals, subauthors, and subkeyterms',
      ],
      fixes: ['Fixed profile image sizing/distortion on the profile and chat pages'],
      improvements: [],
    },
    {
      version: 'Alpha v0.34',
      date: 'Monday, February 21st 2022',
      additions: [
        'Added an additional way of accessing the settings menu with a link above the logout button on the main navigation panel',
      ],
      fixes: [
        'Fixed a bug where on initial log in, dashboard data would not load',
        'Fixed a bug where completing a task would not remove it from the today view',
      ],
      improvements: [
        'Added a simple responsive design to the dashboard and profile pages. NOTE: This is not fully functional, just an temporary step in the direction of a fully responsive design',
        'Added responsiveness to the feedback button',
      ],
    },
    {
      version: 'Alpha v0.33',
      date: 'Saturday, February 19th 2022',
      additions: [
        'Created an onboarding flow for users logging in for the first time',
        'Refactored the new profile page, adding additional fields about the user',
        'Added unread notifications for admin users',
      ],
      fixes: ['Fixed a bug where new quick tasks could not be created'],
      improvements: ['Redesigned the profile page'],
    },
    {
      version: 'Alpha v0.32',
      date: 'Tuesday, February 15th 2022',
      additions: [
        'Added a number next to Journals/Authors/Keywords to display the number of sub items underneath them',
        'Made the standard view task area on the sidebar collapsible like the project section',
        'Added a sound effect when a chat message is sent',
        'Added timestamps to chat messages',
        'Added a visual date separator to chat discussions',
      ],
      fixes: [
        'Removed confetti when archiving a task',
        'Overhauled all dates and times to show the dates based on the users current timezone',
      ],
      improvements: [
        'Refactored the design of the settings page and added some additional settings',
      ],
    },
    {
      version: 'Alpha v0.31',
      date: 'Sunday, February 13th 2022',
      additions: [
        'Added a Dissertation Tasks section',
        'Added sorting options to tasks',
        'Added a date filtering option to tasks',
      ],
      fixes: [
        'Fixed box sizing issue on dashboard for 1920x1080 viewpoint',
        'Fixed a bug where Tasks/Journals/Authors/Keyterms would not load initially on dashboard',
      ],
      improvements: [
        'Added a new task view for completed tasks',
        'Archiving a task and completing a task are now two different things',
        'Added an archive task button to the edit task view',
        'Renamed Inbox to Quick Tasks',
      ],
    },
    {
      version: 'Alpha v0.30',
      date: 'Thursday, February 10th 2022',
      additions: [
        'Replaced the third party chat system with a custom built chat better suited for the app',
        'Added a popup to allow users to provide feedback easily for bug tracking',
        'Added the ability to add links to journals, authors, and key terms',
        'Added the ability to add sub journals, authors, and key terms',
        'Added a setting for a dark mode. NOTE: Dark mode is still a work in progress',
      ],
      fixes: ['Truncated long project names on the task page and add task popup'],
      improvements: [
        'Internal state management overhaul with a state management system. This increases responsiveness and allows for much faster development going forward',
        'Upcoming tasks both on the dashboard and task page now only show tasks due up to 7 days in the future',
        'Avatar/Profile dropdown added to every page',
        'Added an identicon to serve as a placeholder for users without a profile image',
        'Daneisms have been updated with new and improved messages',
      ],
    },
    {
      version: 'Alpha v0.26',
      date: 'Wednesday, February 2nd 2022',
      additions: [],
      fixes: [
        'Fixed date on dashboard to show a friendly date accurate to the local timezone of the user',
        'Changed the meetings view on the dashboard to remove meetings after the meeting end time, rather than the start time',
        'Resized the tasks due and meetings sections on the dashboard and their corresponding cards to better match and fit the recent changes',
        'Truncated project name on the dashboard for longer project names',
      ],
      improvements: [
        'Updated various section titles on the tasks page',
        'Adjusted sizing on the task sidebar to better accommodate longer titles',
        "Changed the project name on each card to 'General Task' when the task does not have an assigned project",
        "Renamed 'Tasks due soon' to 'Upcoming Tasks'",
        "Renamed 'Meetings today' to 'Upcoming Meetings'",
        'Added 24 new randomly selected aphorisms to the dashboard',
      ],
    },
    {
      version: 'Alpha v0.25',
      date: 'Tuesday, February 1st 2022',
      additions: [
        'Added a personal task folder',
        'Added a settings page with a sound effect setting',
        'Added a profile image icon in the top right of the dashboard with a dropdown menu for the settings page, changelog page, and ability to logout',
        'Added a link to the dashboard from the changelog page by clicking on the GradCapFinder logo',
      ],
      fixes: [],
      improvements: [
        'Meetings on the dashboard will now no longer be shown after the meeting time has passed',
        'Added the project name to the tasks due soon section of the dashboard',
      ],
    },
    {
      version: 'Alpha v0.24',
      date: 'Monday, January 31st 2022',
      additions: ['Added a join button to the next upcoming meeting card on the dashboard'],
      fixes: [
        'Set default project to Inbox for preset views',
        'Fixed a bug where tasks on the dashboard were not being show in chronological order',
      ],
      improvements: [
        'Restyled the task cards on the dashboard to better fit the design and new 4 task limit',
        'Renamed Archived to All Archived Tasks',
        'Renamed All Tasks to All Current Tasks',
        'All meetings will be shown for admins',
      ],
    },
    {
      version: 'Alpha v0.23',
      date: 'Sunday, January 30th 2022',
      additions: ['Added a task completion sound effect'],
      fixes: [
        'Fixed a bug where you can create a task with no text, it will now show an error notification',
        'Fixed a bug where going over the display limit for tasks on the dashboard caused the whole section to be empty',
      ],
      improvements: [
        'Increased notification time to 5 seconds',
        'Changed notifications to a fully colored background to help them stand out more',
        'Tasks on the tasks page are now sorted chronologically',
        'Dashboard task view is now limited to 4 tasks',
      ],
    },
    {
      version: 'Alpha v0.22',
      date: 'Saturday, January 29th 2022',
      additions: [
        'Added simple task entrance animation',
        'Added a due date badge to each task with a due date',
        "Added an 'All Tasks' view",
      ],
      fixes: [
        'Fixed a bug with the task count leading to dashboard not showing a message when no tasks are present',
        'Updated Supabase integration to fix hot reloading',
      ],
      improvements: ['Updated changelog page to handle multiple entries'],
    },
    {
      version: 'Alpha v0.21',
      date: 'Saturday, January 29th 2022',
      additions: ['Added fireworks on task completion'],
      fixes: [
        'Fixed a bug causing tasks with due dates to not show up properly in the dashboard and Upcoming/Today views',
      ],
      improvements: [
        'Added a pointer and hover animation to the + Add Task button',
        'Added hover and color animation to task checkbox',
        'Aligned Add and Cancel buttons to the right when adding a task',
      ],
    },
  ];

  return (
    <div>
      <ChangelogHeader />
      <Container>
        {changelogs.map((changelog, index) => (
          <ChangelogCard key={index} changelog={changelog} />
        ))}
      </Container>
    </div>
  );
}
