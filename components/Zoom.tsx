import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
    },
  },
};

export default function Zoom() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-full flex justify-between items-center cursor-pointer ${
        open ? " border-2 border-zoomBlue" : "w-18"
      }`}
      onClick={() => setOpen(!open)}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            exit={{ width: 0 }}
            animate={{ width: 160 }}
            initial={{ width: 0 }}
            className="pl-4"
          >
            <motion.p
              exit={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              //   animate={isOpen ? "open" : "closed"}
              //   variants={variants}
            >
              New/Existing
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <img src="/zoom.svg" />
    </div>
  );
}
