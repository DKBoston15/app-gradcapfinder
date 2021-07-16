import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { x: "100vw" },
};

const modal = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.2 },
  },
};

interface IModalProps {
  showModal: boolean;
  setShowModal(value: boolean): void;
}

export default function Modal({ showModal, setShowModal }: IModalProps) {
  const elementRef = useRef(null);
  const closeOverlay = () => {
    setShowModal(true);
  };

  useEffect(() => {
    function handler(event: any) {
      console.log(elementRef.current);
      //@ts-ignore
      if (elementRef.current?.contains(event.target)) {
        // change starts here
        setShowModal(true);
        // change starts here
      }
      setShowModal(false);
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      {showModal && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-modalBackdrop z-20"
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <motion.div className="flex justify-center items-center min-h-full">
            <motion.div
              className="p-16 bg-white rounded-3xl"
              variants={modal}
              ref={elementRef}
            >
              <button className="bg-zoomBlue text-white p-2 rounded-md mr-2 hover:bg-primary">
                Enter Meeting
              </button>
              <button className="bg-zoomBlue text-white p-2 rounded-md">
                Schedule Meeting
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
