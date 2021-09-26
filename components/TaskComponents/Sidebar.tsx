import React from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div data-testid="sidebar">
      <ul>
        <li>
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li>
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li>
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Netx 7 days</span>
        </li>
      </ul>
      <div>
        <span>
          <FaChevronDown />
        </span>

        <h2>Projects</h2>
      </div>
      <ul>Projects will be here</ul>
      Add Project Component Here!
    </div>
  );
}
