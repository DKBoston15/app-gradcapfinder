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
    <div className="bg-black w-80 flex flex-col">
      <div className="bg-white mx-8 p-8 pl-4 pb-5 pt-5 rounded-b-3xl ">
        <img src="/logo.svg" />
      </div>
    </div>
  );
}
