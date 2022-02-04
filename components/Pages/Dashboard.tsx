import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Components
import MainNav from "../MainNav";
import HomePanel from "../DashboardComponents/HomePanel";
import Tasks from "../Pages/Tasks";
import ChatV2 from "./ChatV2";
import Profile from "./Profile";
// import Documents from "../Pages/Documents";
import VideoLibrary from "../Pages/VideoLibrary";
import Schedule from "../Pages/Schedule";
import Settings from "../Pages/Settings";

interface IDashboardProps {
  user: any;
}

// @ts-ignore
export default function Dashboard({ session }: IDashboardProps) {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  return (
    <div>
      <div className="flex min-h-screen">
        <MainNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {currentPage === "Dashboard" && (
          <HomePanel setCurrentPage={setCurrentPage} />
        )}
        {/* @ts-ignore */}
        {currentPage === "Tasks" && <Tasks />}
        {/* @ts-ignore */}
        {currentPage === "ChatV2" && <ChatV2 />}
        {/* {currentPage === "Documents" && <Documents />} */}
        {currentPage === "VideoLibrary" && <VideoLibrary />}
        {/* @ts-ignore */}
        {currentPage === "Profile" && (
          <Profile key={session.user?.id} session={session} />
        )}
        {/* @ts-ignore */}
        {currentPage === "Schedule" && <Schedule />}
        {currentPage === "Settings" && <Settings />}
      </div>
    </div>
  );
}
