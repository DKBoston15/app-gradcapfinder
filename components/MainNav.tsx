import React from "react";
import { motion } from "framer-motion";
// Components
import Signout from "../components/Signout";

interface IMainNavProps {
  setShowThirdPanel(value: boolean): void;
  showThirdPanel: boolean;
}

export default function MainNav({
  setShowThirdPanel,
  showThirdPanel,
}: IMainNavProps) {
  return (
    <motion.div
      exit={{ width: 0 }}
      className="flex flex-col items-start whitespace-nowrap"
    >
      <button onClick={() => setShowThirdPanel(!showThirdPanel)}>
        Show 3rd Panel
      </button>
      <Signout />
    </motion.div>
  );
}
