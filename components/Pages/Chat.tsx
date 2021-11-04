import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// @ts-ignore
import { ChatEngine } from "react-chat-engine";
import dynamic from "next/dynamic";
import firebase from "../../firebase";
import axios from "axios";

export default function Chat() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    console.log(user?.displayName);
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
        axios
          .post("https://api.chatengine.io/users/", formdata, {
            headers: { "private-key": "6bc0ea91-9ee8-43dd-8bab-af5f0997deed" },
          })
          .catch((e) => {
            console.log("error-log", e.message);
          });
      });
  }, [user]);
  if (!user || loading) {
    return "Loading...";
  }

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }
  }, []);

  if (!showChat) return <div />;

  const ChatEngine = dynamic(() =>
    import("react-chat-engine").then((module) => module.ChatEngine)
  );

  return (
    <div className="w-full">
      <ChatEngine
        // @ts-ignore
        projectID="73c96b36-c965-4222-8694-542786398ab3"
        userName={user?.displayName}
        userSecret={user?.uid}
        height="100vh"
      />
    </div>
  );
}
