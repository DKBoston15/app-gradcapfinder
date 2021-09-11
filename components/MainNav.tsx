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
  currentPage: string;
  setCurrentPage(value: string): void;
}

export default function MainNav({
  currentPage,
  setCurrentPage,
}: IMainNavProps) {
  return <div></div>;
}
