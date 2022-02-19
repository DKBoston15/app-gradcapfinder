import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Dashboard from "../components/Pages/Dashboard";
import { supabaseClient } from "../lib/client";
import Feedback from "../components/FeedbackComponents/Feedback";
import Onboarding from "../components/Pages/Onboarding";
import { useTheme } from "next-themes";
import Loader from "../components/Loader";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [onboarded, setOnboarded] = useState(false);
  const [invited, setInvited] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [session, setSession] = useState(null);
  const user = supabaseClient.auth.user();
  const { theme, setTheme } = useTheme();
  // @ts-ignore
  useEffect(async () => {
    // @ts-ignore
    setSession(supabaseClient.auth.session());
    setTheme("light");
    if (!user) {
      router.push("/sign-in");
    }

    if (user) {
      const { data, error, status } = await supabaseClient
        .from("profiles")
        .select(`*`)
        .eq("id", user?.id)
        .single();
      if (!data) {
        setLoading(false);
        router.push("/awaiting-invite");
      } else {
        if (data.onboarding_complete && data.invited) {
          setLoading(false);
          setOnboarded(true);
        }
        if (!data.invited) {
          setLoading(false);
          router.push("/awaiting-invite");
        }
        if (data.invited && !data.onboarding_complete) {
          setLoading(false);
          setOnboarded(false);
        }
      }
    }

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (_event === "PASSWORD_RECOVERY") {
        router.push("/reset-password");
        return;
      }
      // @ts-ignore
      setSession(session);
    });
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
      {loading && (
        <div className="flex justify-center items-center w-full h-screen">
          <Loader />
        </div>
      )}
      <div>
        {!onboarded && !loading && <Onboarding setOnboarded={setOnboarded} />}
      </div>
      <div>
        {onboarded && (
          <div>
            <Feedback currentPage={currentPage} />
            <Dashboard
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              // @ts-ignore
              session={session}
            />
          </div>
        )}
      </div>
    </div>
  );
}
