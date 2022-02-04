import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";

export default function Sidebar({
  setSelectedDiscussion,
  selectedDiscussion,
  daneDiscussionId,
  dakotaDiscussionId,
}: any) {
  return (
    <div className="bg-white h-full min-w-72 w-72 text-left flex flex-col justify-start py-8 px-4">
      <h1 className="text-4xl font-semibold">Chats</h1>
      <div>
        <input
          placeholder="Search"
          className="w-full mr-2 focus:outline-none focus:none focus:none bg-dashGray rounded-lg px-4 py-3 mt-8"
        ></input>
      </div>
      <ul className="mt-8 space-y-4">
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
        <li
          className={`flex space-x-4 items-center hover:bg-dashGray cursor-pointer rounded-md px-4 py-2 ${
            selectedDiscussion == dakotaDiscussionId
              ? "bg-dashGray"
              : "bg-white"
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
      </ul>
    </div>
  );
}
