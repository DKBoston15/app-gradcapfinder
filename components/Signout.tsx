import React from "react";
import firebase from "../firebase";
import { useRouter } from "next/router";

export default function Signout() {
  const router = useRouter();

  const logout = async () => {
    console.log("Logging out");
    try {
      await firebase.auth().signOut();

      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={() => logout()}>Sign Out</button>;
}
