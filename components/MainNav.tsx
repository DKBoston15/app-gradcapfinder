import React from "react";
import { motion } from "framer-motion";
import {
  RiDashboardLine,
  RiFileList2Line,
  RiDiscussLine,
  RiArticleLine,
  RiVideoChatLine,
  RiCreativeCommonsByFill,
  RiCalendarLine,
  RiFolderInfoLine,
} from "react-icons/ri";
// Components
import Signout from "../components/Signout";
import Avatar from "./DashboardComponents/Avatar";
import Logo from "../public/logo.svg";

interface IMainNavProps {
  currentPage: string;
  setCurrentPage(value: string): void;
}

export default function MainNav({
  currentPage,
  setCurrentPage,
}: IMainNavProps) {
  return (
    <div className="bg-dark dark:bg-dark dark:border-r-2 dark:border-darkSlateGray w-80 min-w-80 flex flex-col justify-between pb-8 min-h-screen">
      <div>
        <div className="bg-white mx-8 p-8 pl-4 pb-5 pt-5 rounded-b-3xl ">
          <img src="/logo.svg" />
        </div>
        <div className="flex space-y-6 flex-col">
          <div
            className={`flex flex-col text-white text-2xl hover:bg-primary mx-8 rounded-xl py-3 cursor-pointer mt-20 ${
              currentPage == "Dashboard" ? "bg-primary" : "bg-black"
            }`}
            onClick={() => setCurrentPage("Dashboard")}
          >
            <div className="flex items-center justify-start pl-4">
              <RiDashboardLine className="mr-4" />
              Dashboard
            </div>
          </div>
          <div
            className={`flex flex-col text-white text-2xl hover:bg-primary mx-8 rounded-xl py-3 cursor-pointer ${
              currentPage == "Tasks" ? "bg-primary" : "bg-black"
            }`}
            onClick={() => setCurrentPage("Tasks")}
          >
            <div className="flex items-center justify-start pl-4">
              <RiFileList2Line className="mr-4" />
              Tasks
            </div>
          </div>
          {/* <div
            className={`flex flex-col text-white text-2xl hover:bg-primary mx-8 rounded-xl py-3 cursor-pointer ${
              currentPage == "Chat" ? "bg-primary" : "bg-black"
            }`}
            onClick={() => setCurrentPage("ChatV2")}
          >
            <div className="flex items-center justify-start pl-4">
              <RiDiscussLine className="mr-4" />
              Chat
            </div>
          </div> */}
          {/* <div
            className={`flex flex-col text-white text-2xl hover:bg-primary mx-8 rounded-xl py-3 cursor-pointer ${
              currentPage == "Documents" ? "bg-primary" : "bg-black"
            }`}
            onClick={() => setCurrentPage("Documents")}
          >
            <div className="flex items-center justify-start pl-4">
              <RiFolderOpenLine className="mr-4" />
              Documents
            </div>
          </div> */}
          <div
            className={`flex flex-col text-white text-2xl hover:bg-primary mx-8 rounded-xl py-3 cursor-pointer ${
              currentPage == "VideoLibrary" ? "bg-primary" : "bg-black"
            }`}
            onClick={() => setCurrentPage("VideoLibrary")}
          >
            <div className="flex items-center justify-start pl-4">
              <RiVideoChatLine className="mr-4" />
              Video Library
            </div>
          </div>
          <div
            className={`flex flex-col text-white text-2xl hover:bg-primary mx-8 rounded-xl py-3 cursor-pointer ${
              currentPage == "Resources" ? "bg-primary" : "bg-black"
            }`}
            onClick={() => setCurrentPage("Resources")}
          >
            <div className="flex items-center justify-start pl-4">
              <RiFolderInfoLine className="mr-4" />
              Resources
            </div>
          </div>
          <div
            className={`flex flex-col text-white text-2xl hover:bg-primary mx-8 rounded-xl py-3 cursor-pointer ${
              currentPage == "Profile" ? "bg-primary" : "bg-black"
            }`}
            onClick={() => setCurrentPage("Profile")}
          >
            <div className="flex items-center justify-start pl-4">
              <RiCreativeCommonsByFill className="mr-4" />
              Profile
            </div>
          </div>
          <div
            className={`flex flex-col text-white text-2xl hover:bg-primary mx-8 rounded-xl py-3 cursor-pointer ${
              currentPage == "Schedule" ? "bg-primary" : "bg-black"
            }`}
            onClick={() => setCurrentPage("Schedule")}
          >
            <div className="flex items-center justify-start pl-4">
              <RiCalendarLine className="mr-4" />
              Schedule
            </div>
          </div>
          <div
            className={`flex flex-col text-white text-2xl hover:bg-primary mx-8 rounded-xl py-3 cursor-pointer ${
              currentPage == "Articles" ? "bg-primary" : "bg-black"
            }`}
            onClick={() => setCurrentPage("Articles")}
          >
            <div className="flex items-center justify-start pl-4">
              <RiArticleLine className="mr-4" />
              Articles
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-white space-y-2 items-center justify-center">
        <span
          className="cursor-pointer"
          onClick={() => setCurrentPage("Settings")}
        >
          Settings
        </span>
        <Signout />
      </div>
    </div>
  );
}
