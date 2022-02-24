import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Components
import MainNav from "../MainNav";
import HomePanel from "../DashboardComponents/HomePanel";
import Tasks from "../Pages/Tasks";
import ChatV2 from "./ChatV2";
import Profile from "./Profile";
// import Documents from "../Pages/Documents";
import VideoLibrary from "../Pages/VideoLibrary";
import Schedule from "../Pages/Schedule";
import Settings from "../Pages/Settings";
import { useProfileStore } from "../../store/profileStore";
import { useChatStore } from "../../store/chatStore";
import { useJournalStore } from "../../store/journalStore";
import { useKeytermStore } from "../../store/keytermStore";
import { useAuthorStore } from "../../store/authorStore";
import { useTaskStore } from "../../store/taskStore";
import { supabaseClient } from "../../lib/client";
interface IDashboardProps {
  user: any;
  currentPage: string;
  setCurrentPage: (currentPage: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  setLocalDarkMode: (localDarkMode: boolean) => void;
  localDarkMode: boolean;
}

export default function Dashboard({
  currentPage,
  setCurrentPage,
  // @ts-ignore
  session,
  theme,
  setTheme,
  setLocalDarkMode,
  localDarkMode,
}: IDashboardProps) {
  const user = supabaseClient.auth.user();
  const getProfile = useProfileStore((state: any) => state.getProfile);
  const getProfiles = useProfileStore((state: any) => state.getProfiles);
  const getJournals = useJournalStore((state: any) => state.getJournals);
  const getSubjournals = useJournalStore((state: any) => state.getSubjournals);
  const getAuthors = useAuthorStore((state: any) => state.getAuthors);
  const getSubauthors = useAuthorStore((state: any) => state.getSubauthors);
  const getKeyterms = useKeytermStore((state: any) => state.getKeyterms);
  const getSubKeyterms = useKeytermStore((state: any) => state.getSubKeyterms);
  const getDiscussionsForUser = useChatStore(
    (state: any) => state.getDiscussionsForUser
  );
  const getDiscussionsForAdmin = useChatStore(
    (state: any) => state.getDiscussionsForAdmin
  );
  const getTasks = useTaskStore((state: any) => state.getTasks);
  const getProjects = useTaskStore((state: any) => state.getProjects);

  useEffect(() => {
    const realtimeJournalUpdates = supabaseClient
      .from("journals")
      .on("*", (payload) => {
        const getJournals = useJournalStore.getState().getJournals;
        const getSubjournals = useJournalStore.getState().getSubjournals;
        getJournals();
        getSubjournals();
      })
      .subscribe();

    const realtimeSubJournalUpdates = supabaseClient
      .from("subjournals")
      .on("*", (payload) => {
        const getSubjournals = useJournalStore.getState().getSubjournals;
        getSubjournals();
      })
      .subscribe();

    const realtimeAuthorUpdates = supabaseClient
      .from("authors")
      .on("*", (payload) => {
        const getAuthors = useAuthorStore.getState().getAuthors;
        const getSubauthors = useAuthorStore.getState().getSubauthors;
        getAuthors();
        getSubauthors();
      })
      .subscribe();

    const realtimeSubAuthorUpdates = supabaseClient
      .from("subauthors")
      .on("*", (payload) => {
        const getSubauthors = useAuthorStore.getState().getSubauthors;
        getSubauthors();
      })
      .subscribe();

    const realtimeKeytermUpdates = supabaseClient
      .from("key_terms")
      .on("*", (payload) => {
        const getKeyterms = useKeytermStore.getState().getKeyterms;
        const getSubKeyterms = useKeytermStore.getState().getSubKeyterms;
        getKeyterms();
        getSubKeyterms();
      })
      .subscribe();

    const realtimeSubKeytermsUpdates = supabaseClient
      .from("subkeyterms")
      .on("*", (payload) => {
        const getSubKeyterms = useKeytermStore.getState().getSubKeyterms;
        getSubKeyterms();
      })
      .subscribe();
  }, []);

  // @ts-ignore
  useEffect(async () => {
    if (user) {
      await getProfile(user?.id);
      await getProfiles();
      await getJournals();
      await getSubjournals();
      await getAuthors();
      await getSubauthors();
      await getKeyterms();
      await getSubKeyterms();
      await getDiscussionsForUser(user?.id);
      await getDiscussionsForAdmin(user?.id);
      await getTasks();
      await getProjects();
    }
  }, [user]);

  return (
    <div>
      <div className="flex min-h-screen h-full dark:bg-dark">
        <MainNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {currentPage === "Dashboard" && (
          <HomePanel setCurrentPage={setCurrentPage} />
        )}
        {/* @ts-ignore */}
        {currentPage === "Tasks" && <Tasks setCurrentPage={setCurrentPage} />}
        {/* @ts-ignore */}
        {currentPage === "ChatV2" && <ChatV2 setCurrentPage={setCurrentPage} />}
        {/* {currentPage === "Documents" && <Documents />} */}
        {currentPage === "VideoLibrary" && (
          <VideoLibrary setCurrentPage={setCurrentPage} />
        )}
        {/* @ts-ignore */}
        {currentPage === "Profile" && (
          <Profile
            key={session.user?.id}
            session={session}
            setCurrentPage={setCurrentPage}
          />
        )}
        {/* @ts-ignore */}
        {currentPage === "Schedule" && <Schedule />}
        {currentPage === "Settings" && (
          <Settings
            key={session.user?.id}
            session={session}
            setCurrentPage={setCurrentPage}
            theme={theme}
            setTheme={setTheme}
            setLocalDarkMode={setLocalDarkMode}
            localDarkMode={localDarkMode}
          />
        )}
      </div>
    </div>
  );
}
