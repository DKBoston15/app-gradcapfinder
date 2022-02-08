import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaHatWizard } from "react-icons/fa";
import AdminSidebarDiscussion from "./AdminSidebarDiscussion";

export default function AdminSidebar({
  setSelectedDiscussion,
  selectedDiscussion,
  discussions,
}: any) {
  return (
    <div className="bg-white dark:bg-black h-full min-w-72 w-72 text-left flex flex-col justify-start py-8 px-4">
      <h1 className="text-4xl font-semibold">Chats</h1>
      <div>
        <input
          placeholder="Search"
          className="w-full mr-2 focus:outline-none focus:none focus:none bg-dashGray dark:bg-completeBlack rounded-lg px-4 py-3 mt-8"
        ></input>
      </div>
      <ul className="mt-8 space-y-4">
        {/* @ts-ignore */}
        {discussions.map((discussion, index) => (
          <li
            key={discussion.id}
            className={`flex space-x-4 items-center hover:bg-dashGray dark:hover:bg-completeBlack cursor-pointer rounded-md px-4 py-2 ${
              selectedDiscussion == discussion.id
                ? "bg-dashGray dark:bg-completeBlack"
                : "bg-white dark:bg-black"
            }`}
            onClick={() => {
              setSelectedDiscussion(discussion.id);
            }}
          >
            <AdminSidebarDiscussion discussion={discussion} />
          </li>
        ))}
      </ul>
    </div>
  );
}
