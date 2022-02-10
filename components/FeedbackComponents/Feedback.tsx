import React, { useState } from "react";
import { RiInformationLine, RiFeedbackLine } from "react-icons/ri";
import { useProfileStore } from "../../store/profileStore";
import { supabaseClient } from "../../lib/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Feedback({ currentPage }: any) {
  const user = supabaseClient.auth.user();

  const [feedback, setFeedback] = useState("");
  const [open, setOpen] = useState(false);
  const profile = useProfileStore((state: any) => state.profile);

  const submitFeedback = async () => {
    const { data, error } = await supabaseClient
      .from("feedback")
      .insert([{ feedback, user_id: user?.id }]);
    setOpen(false);
    toast.success("Feedback Submitted!", {
      theme: "colored",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        className={`absolute bottom-4 z-75 ${
          currentPage === "ChatV2" ? "hidden" : "right-4"
        }`}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`flex-1 mt-16 mr-4 w-96 mb-32 bg-white shadow-xl rounded-lg overflow-hidden relative`}
            >
              <div className="bg-black h-64 rounded-t-lg absolute w-full z-0"></div>
              <div className="flex flex-col overflow-y-auto h-full p-4 space-y-4">
                <div className="flex flex-col z-10 ml-4 text-white text-5xl">
                  <div className="mb-4">
                    <RiInformationLine />
                  </div>
                  <div className="text-3xl mb-2 ml-1">
                    Hi {profile.first_name || "Runner"} 👋
                  </div>
                  <div className="w-60 text-gray-200 text-sm mb-1 ml-1">
                    Help us make the platform better for you by sharing positive
                    or negative feedback with us as you have it!
                  </div>
                </div>
                <div className="border-0 border-t-4 border-blue-500 rounded z-10 shadow-md">
                  <div className="bg-white border border-t-0 rounded-t-none rounded-b p-6 flex flex-col space-y-2">
                    <div className="font-semibold text-sm">
                      Send us your feedback/bugs
                    </div>
                    <div className="flex flex-row">
                      <textarea
                        id="feedback"
                        //@ts-ignore
                        onChange={(e) => setFeedback(e.target.value)}
                        name="feedback"
                        placeholder="Feedback..."
                        className="block w-full p-3 mt-2 text-gray-700 appearance-none  border-2 border-black ocus:shadow-inner"
                      />
                    </div>
                    <button
                      className={`font-bold text-white rounded-lg py-2 px-4 mt-4 w-full mr-1 text-md cursor-pointer bg-black dark:bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
                      onClick={() => submitFeedback()}
                    >
                      Send Feedback
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-4 bottom-4 bg-primary rounded-full w-16 h-16 m-4 flex items-center justify-center cursor-pointer shadow-xl"
        >
          <AnimatePresence>
            {!open && (
              <motion.div
                className="text-4xl text-white"
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <RiFeedbackLine />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
