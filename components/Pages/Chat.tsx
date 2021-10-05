import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// @ts-ignore
import { ChatEngine } from "nextjs-chat-engine";
require("react-quill/dist/quill.snow.css");
import firebase from "../../firebase";
import axios from "axios";

export default function Chat() {
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "Project-ID": "73c96b36-c965-4222-8694-542786398ab3",
          "user-name": user?.displayName,
          "user-secret": user?.uid,
        },
      })
      .then(() => {})
      .catch(() => {
        let formdata = new FormData();
        // @ts-ignore
        formdata.append("email", user.email);
        // @ts-ignore
        formdata.append("username", user.displayName);
        // @ts-ignore
        formdata.append("secret", user.uid);
        console.log("posting");
        axios.post("https://api.chatengine.io/users/", formdata, {
          headers: { "private-key": "6bc0ea91-9ee8-43dd-8bab-af5f0997deed" },
        });
      });
  }, [user]);
  if (!user || loading) {
    return "Loading...";
  }
  return (
    <div className="w-full">
      <ChatEngine
        projectID="73c96b36-c965-4222-8694-542786398ab3"
        userName={user?.displayName}
        userSecret={user?.uid}
        height="100vh"
      />
    </div>
  );
}
