import React from "react";
import { motion } from "framer-motion";

export default function Avatar() {
  return (
    <motion.img
      exit={{ width: 0 }}
      className="mt-5 mb-5 rounded-full h-12"
      src="/avatar-placeholder.jpeg"
    />
  );
}
