import React from "react";
import { motion } from "framer-motion";

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
  animationTwo: {
    x: [-5, 5],
    y: [0, -10],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
};

export default function Loader({ variant }: any) {
  if (variant === "small") {
    return (
      <>
        <motion.div
          className="w-[10px] h-[10px] rounded-full bg-white mt-2.5"
          variants={loaderVariants}
          animate="animationTwo"
        ></motion.div>
      </>
    );
  } else {
    return (
      <>
        <motion.div
          className="w-[30px] h-[30px] m-[40px] rounded-full bg-primary"
          variants={loaderVariants}
          animate="animationOne"
        ></motion.div>
      </>
    );
  }
}
