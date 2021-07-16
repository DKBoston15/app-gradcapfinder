import React, { useState } from "react";
import { motion } from "framer-motion";

interface IZoomProps {
  setShowThirdPanel(value: boolean): void;
}

export default function Zoom({ setShowThirdPanel }: IZoomProps) {
  return (
    <div
      className="fixed bottom-6 right-6 rounded-full flex justify-between items-center cursor-pointer"
      onClick={() => setShowThirdPanel(true)}
    >
      <motion.img
        className="z-10"
        src="/zoom.svg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
    </div>
  );
}
