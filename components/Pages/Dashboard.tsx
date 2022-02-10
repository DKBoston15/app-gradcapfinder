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
import { supabaseClient } from "../../lib/client";
interface IDashboardProps {
  user: any;
  currentPage: string;
  setCurrentPage: (currentPage: string) => void;
}

export default function Dashboard({
  currentPage,
  setCurrentPage,
  // @ts-ignore
  session,
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

  useEffect(() => {
    getProfile(user?.id);
    getProfiles();
    getJournals();
    getSubjournals();
    getAuthors();
    getSubauthors();
    getKeyterms();
    getSubKeyterms();
    getDiscussionsForUser(user?.id);
    getDiscussionsForAdmin(user?.id);
  }, [user]);

  return (
    <div>
      <div className="flex min-h-screen">
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
        {currentPage === "Settings" && <Settings />}
      </div>
    </div>
  );
}
