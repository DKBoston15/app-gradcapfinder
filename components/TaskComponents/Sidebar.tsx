import React, { useState } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";
import Projects from "./Projects";
import AddProject from "./AddProject";

export default function Sidebar() {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("inbox");
  const [showProjects, setShowProjects] = useState("inbox");

  return (
    <div
      data-testid="sidebar"
      className="bg-hoverGray h-full min-w-72 w-72 text-left flex flex-col justify-start py-28 px-8"
    >
      <ul className="">
        <li className="flex space-x-4 items-center">
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li className="flex space-x-4 items-center mt-4">
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li className="flex space-x-4 items-center mt-4">
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div className="mt-4 flex space-x-4 items-center">
        <span>
          <FaChevronDown />
        </span>

        <h2>Projects</h2>
      </div>
      <hr className="mt-4" />
      <ul className="mt-4">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  );
}
