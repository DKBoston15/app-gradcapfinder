import React, { useState, useEffect } from "react";
import { useTaskStore } from "../../store/taskStore";
import { useProfileStore } from "../../store/profileStore";
import { useChatStore } from "../../store/chatStore";
import { motion, AnimatePresence } from "framer-motion";
import { supabaseClient } from "../../lib/client";
import Avatar from "../DashboardComponents/Avatar";

export default function Onboarding({ setOnboarded }: any) {
  const [page, setPage] = useState(1);
  const user = supabaseClient.auth.user();
  const updateProfile = useProfileStore((state: any) => state.updateProfile);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [avatar_url, setAvatarUrl] = useState(null);
  const addUnassignedProject = useTaskStore(
    (state: any) => state.addUnassignedProject
  );
  const addPersonalProject = useTaskStore(
    (state: any) => state.addPersonalProject
  );
  const addDissertationProject = useTaskStore(
    (state: any) => state.addDissertationProject
  );
  const addDefaultDiscussions = useChatStore(
    (state: any) => state.addDefaultDiscussions
  );

  //   @ts-ignore
  async function update({
    firstName,
    lastName,
    fieldOfStudy,
    avatar_url,
  }: any) {
    const user = supabaseClient.auth.user();

    await updateProfile(
      user?.id,
      firstName,
      lastName,
      fieldOfStudy,
      avatar_url,
      true
    );
  }

  //   @ts-ignore
  useEffect(async () => {
    if (page === 2) {
      await addUnassignedProject();
      await addPersonalProject();
      await addDissertationProject();
      const daneDiscussion = await addDefaultDiscussions(
        user?.id,
        process.env.NEXT_PUBLIC_DANE_USER_ID,
        "Chat with Dr.Bozeman"
      );
      const techDiscussion = await addDefaultDiscussions(
        user?.id,
        process.env.NEXT_PUBLIC_TECH_USER_ID,
        "Chat with Tech Support"
      );
      await addMessage(
        "Welcome to GradCapFinder!",
        process.env.NEXT_PUBLIC_DANE_USER_ID,
        daneDiscussion[0].id,
        true
      );
      await addMessage(
        "Welcome to GradCapFinder, if you have any tech related questions, feel free to reach out!",
        process.env.NEXT_PUBLIC_TECH_USER_ID,
        techDiscussion[0].id,
        true
      );
    }
  }, [page]);

  const addMessage = useChatStore((state: any) => state.addMessage);

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
              exit: {
                x: -1000,
              },
            }}
            className="bg-white h-5xl w-4xl shadow-lg flex justify-center items-center flex-col text-5xl justify-between p-16 pb-30"
          >
            <img className="w-lg h-lg" src="/Project_Managers.png" />
            <div className="flex justify-center flex-col items-center">
              <div>
                Welcome to the <br />
                <span className="text-primary">GradCapFinder App</span>
              </div>
              <div className="text-gray text-lg pt-8">
                We designed the GCF App to assist graduate learners, like
                yourself, finish their degree. Click below to discover more.
              </div>
            </div>
            <button
              className="bg-primary shadow-lg text-white p-4 rounded-lg text-3xl w-sm"
              onClick={() => setPage(2)}
            >
              Get Started
            </button>
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
            <img className="w-lg h-lg" src="/Intro2.png" />
            <div className="flex justify-center flex-col items-center">
              <div>
                <span className="text-primary">Over a Decade </span>
                of <br />
                Graduate Learners
              </div>
              <div className="text-gray text-lg pt-8">
                We possess over a decade’s worth of experiences with graduate
                learners. We constructed the GCF App from those experiences. We
                believe this App will provide you invaluable support as a
                learner and academic. Click below to be a PhD.
              </div>
            </div>
            <button
              className="bg-primary shadow-lg text-white p-4 rounded-lg text-3xl w-sm"
              onClick={() => setPage(3)}
            >
              Next
            </button>
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
            <div className="flex justify-center flex-col items-center">
              <div>
                <span className="text-black dark:text-black">A Bit About</span>
                <span className="text-primary"> You</span>
              </div>
              <div className="mt-12 pb-12">
                <Avatar
                  url={avatar_url}
                  size={125}
                  onUpload={(url: any) => {
                    setAvatarUrl(url);
                    update({
                      firstName,
                      lastName,
                      fieldOfStudy,
                      avatar_url: url,
                    });
                  }}
                />
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
                    Field Of Study
                  </label>
                  <input
                    id="fieldOfStudy"
                    type="text"
                    value={fieldOfStudy || ""}
                    //@ts-ignore
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    name="fieldOfStudy"
                    className="text-lg block w-md p-3 mt-2 text-gray-700 bg-whiteSmoke border-2 border-primary rounded-lg focus:bg-whiteSmoke focus:shadow-inner"
                  />
                </div>
              </div>
            </div>
            <button
              className={`shadow-lg text-white p-4 rounded-lg text-3xl w-sm ${
                firstName == "" || lastName == "" || fieldOfStudy == ""
                  ? "bg-silver"
                  : "bg-primary"
              }`}
              disabled={
                firstName == "" || lastName == "" || fieldOfStudy == ""
                  ? true
                  : false
              }
              onClick={() => {
                update({
                  firstName,
                  lastName,
                  fieldOfStudy,
                  avatar_url,
                });
                setOnboarded(true);
              }}
            >
              Let's Go
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
