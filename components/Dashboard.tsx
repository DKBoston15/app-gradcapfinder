import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Components
import MainNav from "./MainNav";
import HomePanel from "./HomePanel";
import ThirdPanel from "./ThirdPanel";

interface IDashboardProps {
  setShowThirdPanel(value: boolean): void;
  showThirdPanel: boolean;
  user: any;
}

export default function Dashboard({
  setShowThirdPanel,
  showThirdPanel,
  user,
}: IDashboardProps) {
  const [showNav, setShowNav] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");

  useEffect(() => {
    if (fullScreen) {
      setShowThirdPanel(false);
      setShowNav(false);
    } else {
      // Insert logic for showing 3rd panel here
      setShowThirdPanel(true);
      setShowNav(true);
    }
  }, [fullScreen]);

  return (
    <div>
      <div className="flex min-h-screen">
        <AnimatePresence initial={false}>
          {showNav && (
            <motion.div
              exit={{ width: 0 }}
              animate={{ width: 280 }}
              initial={{ width: 0 }}
              className="bg-slateGray w-72 text-white"
            >
              <MainNav
                setShowThirdPanel={setShowThirdPanel}
                showThirdPanel={showThirdPanel}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {currentPage === "Dashboard" && (
          <HomePanel
            setFullScreen={setFullScreen}
            fullScreen={fullScreen}
            showThirdPanel={showThirdPanel}
            setShowThirdPanel={setShowThirdPanel}
          />
        )}
        {/* {currentPage === "Chat" && <Chat />} */}

        <AnimatePresence initial={false}>
          {showThirdPanel && (
            <motion.div
              exit={{ width: 0 }}
              animate={{ width: 550 }}
              initial={{ width: 0 }}
              className="w-72 bg-whiteSmoke"
            >
              {/* @ts-ignore */}
              <ThirdPanel variant="Meetings" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
