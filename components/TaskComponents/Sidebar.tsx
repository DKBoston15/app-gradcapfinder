import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
  FaArchive,
  FaFolderOpen,
} from "react-icons/fa";
import Projects from "./Projects";
import { AddProject } from "./AddProject";

export default function Sidebar({
  projects,
  onSubmitProject,
  onDeleteProject,
  selectedProject,
  setSelectedProject,
  project,
  setProject,
}: any) {
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="bg-hoverGray h-full min-w-72 w-72 text-left flex flex-col justify-start py-28 px-8">
      <ul className="">
        <li
          className={`flex space-x-4 items-center hover:bg-white cursor-pointer rounded-md px-4 py-2 ${
            selectedProject == "INBOX" ? "bg-white" : ""
          }`}
          onClick={() => {
            setSelectedProject("INBOX");
            setProject("INBOX");
          }}
        >
          <span className="text-blue text-xl">
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li
          className="flex space-x-4 items-center  hover:bg-white cursor-pointer rounded-md px-4 py-2"
          onClick={() => {
            setSelectedProject("TODAY");
            setProject("TODAY");
          }}
        >
          <span className="text-green text-xl">
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li
          className="flex space-x-4 items-center  hover:bg-white cursor-pointer rounded-md px-4 py-2"
          onClick={() => {
            setSelectedProject("UPCOMING");
            setProject("UPCOMING");
          }}
        >
          <span className="text-purple text-xl">
            <FaRegCalendarAlt />
          </span>
          <span>Upcoming</span>
        </li>
        <li
          className="flex space-x-4 items-center  hover:bg-white cursor-pointer rounded-md px-4 py-2"
          onClick={() => {
            setSelectedProject("ALLTASKS");
            setProject("ALLTASKS");
          }}
        >
          <span className="text-primary text-xl">
            <FaFolderOpen />
          </span>
          <span>All Tasks</span>
        </li>
        <li
          className="flex space-x-4 items-center  hover:bg-white cursor-pointer rounded-md px-4 py-2"
          onClick={() => {
            setSelectedProject("ARCHIVED");
            setProject("ARCHIVED");
          }}
        >
          <span className="text-gray text-xl">
            <FaArchive />
          </span>
          <span>Archived</span>
        </li>
      </ul>
      <div
        className="mt-2 flex space-x-4 items-center cursor-pointer px-4 py-2"
        onClick={() => setShowProjects(!showProjects)}
      >
        <span className={showProjects ? undefined : `-rotate-90`}>
          <FaChevronDown />
        </span>

        <h2>Project</h2>
      </div>
      <hr className="mt-0" />
      <ul className="mt-4">
        {showProjects && (
          <Projects
            setSelectedProject={setSelectedProject}
            projects={projects}
            onDeleteProject={onDeleteProject}
            project={project}
            setProject={setProject}
          />
        )}
      </ul>
      {showProjects && (
        <AddProject projects={projects} onSubmitProject={onSubmitProject} />
      )}
    </div>
  );
}
