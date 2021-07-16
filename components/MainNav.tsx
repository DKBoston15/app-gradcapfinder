import React from "react";
import { motion } from "framer-motion";
import {
  RiDashboardLine,
  RiFileList2Line,
  RiDiscussLine,
  RiFolderOpenLine,
  RiVideoChatLine,
} from "react-icons/ri";
// Components
import Signout from "../components/Signout";
import Avatar from "./Avatar";

interface IMainNavProps {
  setShowThirdPanel(value: boolean): void;
  showThirdPanel: boolean;
}

export default function MainNav({
  setShowThirdPanel,
  showThirdPanel,
}: IMainNavProps) {
  return (
    <motion.div
      exit={{ width: 0 }}
      className="flex flex-col flex-grow items-start whitespace-nowrap min-h-full place-content-between"
    >
      <div>
        <motion.div exit={{ width: 0 }} className="bg-white p-3 w-72">
          <img
            src="/logo.svg"
            className="h-10 flex justify-center items-center"
          />
        </motion.div>
        <div className="p-5">
          <Avatar />
          <div className="mt-2">Dakota Brown</div>
          <div className="mt-2">Tackling Software Development</div>
          <div className="mt-2 underline">Edit Profile</div>
          <hr className="mt-4" />
        </div>
        <div className="p-3">
          <div className="flex items-center p-2 hover:bg-dimGray cursor-pointer rounded-lg">
            <RiDashboardLine className="text-3xl mr-3" />
            Dashboard
          </div>
          <div className="flex items-center mt-2 p-2 hover:bg-dimGray cursor-pointer rounded-lg">
            <RiFileList2Line className="text-3xl mr-3" />
            Tasks
          </div>
          <div className="flex items-center mt-2 p-2 hover:bg-dimGray cursor-pointer rounded-lg">
            <RiDiscussLine className="text-3xl mr-3" />
            Chat
          </div>
          <div className="flex items-center mt-2 p-2 hover:bg-dimGray cursor-pointer rounded-lg">
            <RiFolderOpenLine className="text-3xl mr-3" />
            Documents
          </div>
          <div className="flex items-center mt-2 p-2 hover:bg-dimGray cursor-pointer rounded-lg">
            <RiVideoChatLine className="text-3xl mr-3" />
            Video Library
          </div>
        </div>
      </div>
      <Signout />
    </motion.div>
  );
}
