import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Dashboard from "../components/Pages/Dashboard";
import { supabaseClient } from "../lib/client";
import Feedback from "../components/FeedbackComponents/Feedback";
import { useChatStore } from "../store/chatStore";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const router = useRouter();

  const [session, setSession] = useState(null);
  const user = supabaseClient.auth.user();
  const addDefaultDiscussions = useChatStore((state: any) => state.addMessage);
  const getDiscussionsForAdmin = useChatStore(
    (state: any) => state.getDiscussionsForUser
  );
  const getDiscussionsForUser = useChatStore(
    (state: any) => state.getDiscussionsForUser
  );

  // @ts-ignore
  useEffect(async () => {
    // @ts-ignore
    setSession(supabaseClient.auth.session());

    if (!user) {
      router.push("/sign-in");
    }

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (_event === "PASSWORD_RECOVERY") {
        router.push("/reset-password");
        return;
      }
      // @ts-ignore
      setSession(session);
    });

    const discussionsForUser = useChatStore(
      (state: any) => state.discussionsForUser
    );

    const getDiscussionsForAdmin = useChatStore(
      (state: any) => state.getDiscussionsForUser
    );

    await discussionsForUser();
    await getDiscussionsForAdmin();

    if (!discussionsForUser && !getDiscussionsForAdmin) {
      await addDefaultDiscussions(
        user?.id,
        process.env.NEXT_PUBLIC_DANE_USER_ID,
        "Chat with Dr.Bozeman"
      );
      await addDefaultDiscussions(
        user?.id,
        process.env.NEXT_PUBLIC_TECH_USER_ID,
        "Chat with Tech Support"
      );
    }
  }, []);

  return (
    <div>
      <Head>
        <title>GradCapFinder</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* @ts-ignore */}
      <Feedback currentPage={currentPage} />
      <Dashboard
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        // @ts-ignore
        session={session}
      />
    </div>
  );
}
