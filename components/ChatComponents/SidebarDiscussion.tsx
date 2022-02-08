import React from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";

export default function SidebarDiscussion({
  dakotaDiscussionId,
  selectedDiscussion,
  daneDiscussionId,
  setSelectedDiscussion,
  admin,
}: any) {
  return (
    <>
      {admin === "Dr. Bozeman" && (
        <li
          className={`flex space-x-4 items-center hover:bg-dashGray cursor-pointer rounded-md px-4 py-2 ${
            selectedDiscussion == daneDiscussionId ? "bg-dashGray" : "bg-white"
          }`}
          onClick={() => {
            setSelectedDiscussion(daneDiscussionId);
          }}
        >
          <span className="text-blue text-4xl">
            <FaChalkboardTeacher />
          </span>
          <span className="font-semibold">Dr. Bozeman</span>
        </li>
      )}
      {admin === "Tech Support" && (
        <li
          className={`flex space-x-4 items-center hover:bg-dashGray cursor-pointer rounded-md px-4 py-2 ${
            selectedDiscussion == dakotaDiscussionId
              ? "bg-dashGray dark:bg-completeBlack"
              : "bg-white dark:bg-black"
          }`}
          onClick={() => {
            setSelectedDiscussion(dakotaDiscussionId);
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
