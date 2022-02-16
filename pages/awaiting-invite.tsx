import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabaseClient } from "../lib/client";
import { useRouter } from "next/router";

export default function AwaitingInvite() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const logout = async () => {
    try {
      await supabaseClient.auth.signOut();

      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestForAccess = async () => {
    const data = await fetch("/api/request-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    });
    if (data.status === 200) {
      setPage(3);
    }
  };

  return (
    <div className="bg-onboardingBG w-full h-screen flex justify-center items-center">
      <AnimatePresence>
        {page === 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
            className="bg-white h-5xl w-4xl shadow-lg flex justify-center items-center flex-col text-5xl justify-between p-16 pb-30"
          >
            <img className="w-lg h-lg" src="/awaitingInvite.png" />
            <div className="flex justify-center flex-col items-center">
              <div>
                Welcome to <br />
                <span className="text-primary">GradCapFinder</span>
              </div>
              <div className="text-gray text-lg mt-8 pt-8 w-lg">
                You are well on your way to using a platform designed
                specifically for you as a graduate student! We are currently an
                invite only app as we continue to develop. <br />
                If you'd like to join, click below!
              </div>
              <div>
                <button
                  className="bg-primary shadow-lg text-white p-4 rounded-lg text-3xl w-sm mt-8"
                  onClick={() => {
                    setPage(2);
                  }}
                >
                  Request Access
                </button>
                <div
                  className="text-lg text-center mt-2 cursor-pointer"
                  onClick={() => logout()}
                >
                  Logout
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {page === 2 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                x: 2000,
              },
              visible: {
                x: 0,
                transition: {
                  delay: 0.2,
                },
              },
              exit: {
                x: -1000,
              },
            }}
            className="bg-white h-5xl w-4xl shadow-lg flex justify-center items-center flex-col text-5xl justify-between p-16 pb-30"
          >
            <div className="flex justify-between flex-col items-center h-3xl mt-20">
              <div>
                <span className="text-black dark:text-black">A Bit About</span>
                <span className="text-primary"> You</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block mt-2 text-xl font-semibold text-gray-600">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName || ""}
                    //@ts-ignore
                    onChange={(e) => setFirstName(e.target.value)}
                    name="firstName"
                    className="text-lg block w-md p-3 mt-2 text-gray-700 bg-whiteSmoke border-2 border-primary rounded-lg focus:bg-whiteSmoke focus:shadow-inner"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <label className="block mt-2 text-xl font-semibold text-gray-600">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName || ""}
                    //@ts-ignore
                    onChange={(e) => setLastName(e.target.value)}
                    name="lastName"
                    className="text-lg block w-md p-3 mt-2 text-gray-700 bg-whiteSmoke border-2 border-primary rounded-lg focus:bg-whiteSmoke focus:shadow-inner"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <label className="block mt-2 text-xl font-semibold text-gray-600">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    value={email || ""}
                    //@ts-ignore
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    className="text-lg block w-md p-3 mt-2 text-gray-700 bg-whiteSmoke border-2 border-primary rounded-lg focus:bg-whiteSmoke focus:shadow-inner"
                  />
                </div>
              </div>
              <button
                onClick={() => handleRequestForAccess()}
                className={`shadow-lg text-white p-4 rounded-lg text-3xl w-sm ${
                  firstName == "" || lastName == "" || email == ""
                    ? "bg-silver"
                    : "bg-primary"
                }`}
                disabled={
                  firstName == "" || lastName == "" || email == ""
                    ? true
                    : false
                }
              >
                Request Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {page === 3 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
            className="bg-white h-5xl w-4xl shadow-lg flex justify-center items-center flex-col text-5xl justify-between p-16 pb-30"
          >
            <img className="w-lg h-lg" src="/invitesent.png" />
            <div className="flex justify-center flex-col items-center">
              <div>Thank you for requesting access!</div>
              <div className="text-gray text-lg mt-8 pt-8 w-lg">
                We have received your information and will be in touch soon!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
