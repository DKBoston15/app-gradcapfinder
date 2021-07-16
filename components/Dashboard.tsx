import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Components
import MainNav from "./MainNav";
import HomePanel from "./HomePanel";

export default function Dashboard() {
  const [showThirdPanel, setShowThirdPanel] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

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
        <AnimatePresence>
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
              />
            </motion.div>
          )}
        </AnimatePresence>
        <HomePanel
          setFullScreen={setFullScreen}
          fullScreen={fullScreen}
          showThirdPanel={showThirdPanel}
          setShowThirdPanel={setShowThirdPanel}
        />
        <AnimatePresence>
          {showThirdPanel && (
            <motion.div
              exit={{ width: 0 }}
              animate={{ width: 280 }}
              initial={{ width: 0 }}
              className="w-72 bg-whiteSmoke"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
