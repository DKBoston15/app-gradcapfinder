import React from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";

export default function SidebarDiscussion({
  discussion,
  adminDiscussionIds,
  selectedDiscussion,
  setSelectedDiscussion,
}: any) {
  return (
    <>
      {discussion === "Dr.Bozeman" && (
        <li
          className={`flex space-x-4 items-center hover:bg-dashGray cursor-pointer rounded-md px-4 py-2 ${
            selectedDiscussion == adminDiscussionIds["dane"]
              ? "bg-dashGray"
              : "bg-white"
          }`}
          onClick={() => {
            setSelectedDiscussion(adminDiscussionIds["dane"]);
          }}
        >
          <span className="text-blue text-4xl">
            <FaChalkboardTeacher />
          </span>
          <span className="font-semibold">Dr. Bozeman</span>
        </li>
      )}
      {discussion === "Tech Support" && (
        <li
          className={`flex space-x-4 items-center hover:bg-dashGray cursor-pointer rounded-md px-4 py-2 ${
            selectedDiscussion == adminDiscussionIds["techSupport"]
              ? "bg-dashGray dark:bg-completeBlack"
              : "bg-white dark:bg-black"
          }`}
          onClick={() => {
            setSelectedDiscussion(adminDiscussionIds["techSupport"]);
          }}
        >
          <span className="text-green text-4xl">
            <FaHatWizard />
          </span>
          <span className="font-semibold">Tech Support</span>
        </li>
      )}
    </>
  );
}
