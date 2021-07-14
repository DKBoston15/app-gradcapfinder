import { useEffect } from "react";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase";
import { useRouter } from "next/router";

// Components
import Signout from "../components/Signout";

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
          </Head>
          <h1 className="text-yellow-600 text-4xl">Dashboard</h1>
          <Signout />
        </div>
      )}
    </>
  );
}
