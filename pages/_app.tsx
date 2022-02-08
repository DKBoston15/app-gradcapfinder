import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../css/chat.css";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/client";
import { useEffect } from "react";
import { getRouteMatcher } from "next/dist/next-server/lib/router/utils";
import FullStory from "react-fullstory";
import { ThemeProvider } from "next-themes";
import { useProfileStore } from "../store/profileStore";

const ORG_ID = "13J61T";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const user = supabaseClient.auth.user();
  const getProfile = useProfileStore((state: any) => state.getProfile);
  const getProfiles = useProfileStore((state: any) => state.getProfiles);

  useEffect(() => {
    getProfile(user?.id);
    getProfiles();
  }, []);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        handleAuthSession(event, session);
        if (event === "SIGNED_IN") {
          const signedInUser = supabaseClient.auth.user();
          const userId = signedInUser?.id;
          supabaseClient
            .from("profiles")
            .upsert({ id: userId })
            // @ts-ignore
            .then((_data, error) => {
              if (!error) {
                router.push("/");
              }
            });
        }
        if (event === "SIGNED_OUT") {
          router.push("/sign-in");
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (user) {
      if (router.pathname === "/sign-in") {
        router.push("/");
      }
    }
  }, [router.pathname, user, router]);

  // @ts-ignore
  const handleAuthSession = async (event, session) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  return (
    <ThemeProvider attribute="class">
      <FullStory org={ORG_ID} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
