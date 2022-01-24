import React from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/client";

export default function Signout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await supabaseClient.auth.signOut();

      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="text-center text-white bg-logOutBG w-20 h-10 rounded-3xl"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
}
