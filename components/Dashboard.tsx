import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Components
import MainNav from "./MainNav";
import HomePanel from "./HomePanel";

interface IDashboardProps {
  user: any;
}

export default function Dashboard({ user }: IDashboardProps) {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  return (
    <div>
      <div className="flex min-h-screen">
        <MainNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {currentPage === "Dashboard" && <HomePanel />}
      </div>
    </div>
  );
}
