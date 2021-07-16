import { useEffect } from "react";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase";
import { useRouter } from "next/router";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("Loading: ", loading, "|", "Current User: ", user);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/sign-in");
  }, [user, loading]);

  return (
    <>
      {user && (
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
          <Dashboard />
        </div>
      )}
    </>
  );
}
