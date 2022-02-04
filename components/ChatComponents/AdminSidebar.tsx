import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";

export default function AdminSidebar({
  setSelectedDiscussion,
  selectedDiscussion,
  discussions,
  getProfile,
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
        {/* @ts-ignore */}
        {discussions.map((discussion, index) => (
          <li
            key={discussion.id}
            className={`flex space-x-4 items-center hover:bg-dashGray cursor-pointer rounded-md px-4 py-2 ${
              selectedDiscussion == discussion.id ? "bg-dashGray" : "bg-white"
            }`}
            onClick={() => {
              setSelectedDiscussion(discussion.id);
            }}
          >
            <span className="text-blue text-4xl">
              <FaChalkboardTeacher />
            </span>

            <span className="font-semibold">
              {discussion.profiles.first_name} {discussion.profiles.last_name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
