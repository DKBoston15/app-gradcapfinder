import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Components
import MainNav from "../MainNav";
import HomePanel from "../DashboardComponents/HomePanel";
import Tasks from "../Pages/Tasks";
import Chat from "./Chat";
// import Documents from "../Pages/Documents";
import VideoLibrary from "../Pages/VideoLibrary";

interface IDashboardProps {
  user: any;
}

export default function Dashboard({ user }: IDashboardProps) {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  return (
    <div>
      <div className="flex min-h-screen">
        <MainNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {currentPage === "Dashboard" && (
          <HomePanel user={user} setCurrentPage={setCurrentPage} />
        )}
        {/* @ts-ignore */}
        {currentPage === "Tasks" && <Tasks />}
        {/* @ts-ignore */}
        {currentPage === "Chat" && <Chat />}
        {/* {currentPage === "Documents" && <Documents />} */}
        {currentPage === "VideoLibrary" && <VideoLibrary />}
      </div>
    </div>
  );
}
