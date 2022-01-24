import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Dashboard from "../components/Pages/Dashboard";
import { supabaseClient } from "../lib/client";

export default function Home() {
  const router = useRouter();

  const [session, setSession] = useState(null);

  useEffect(() => {
    // @ts-ignore
    setSession(supabaseClient.auth.session());

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
      {/* @ts-ignore */}
      <Dashboard session={session} />
    </div>
  );
}
