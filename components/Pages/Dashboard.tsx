import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Components
import MainNav from "../MainNav";
import HomePanel from "../DashboardComponents/HomePanel";
import Tasks from "../Pages/Tasks";
// import Chat from "./Chat";
import Profile from "./Profile";
// import Documents from "../Pages/Documents";
import VideoLibrary from "../Pages/VideoLibrary";
import Schedule from "../Pages/Schedule";

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
        {/* {currentPage === "Chat" && <Chat />} */}
        {/* {currentPage === "Documents" && <Documents />} */}
        {currentPage === "VideoLibrary" && <VideoLibrary />}
        {/* @ts-ignore */}
        {currentPage === "Profile" && (
          // @ts-ignore
          <Profile key={session.user.id} session={session} />
        )}
        {/* @ts-ignore */}
        {currentPage === "Schedule" && <Schedule />}
      </div>
    </div>
  );
}
