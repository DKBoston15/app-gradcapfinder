import React from "react";
// // @ts-ignore
// import { ChatEngine } from "react-chat-engine";
// import dynamic from "next/dynamic";
// import axios from "axios";
// import { supabaseClient } from "../../lib/client";

export default function Chat() {
  // const [showChat, setShowChat] = useState(false);
  // const [name, setName] = useState("Runner");
  // const user = supabaseClient.auth.user();

  // useEffect(() => {
  //   if (user) {
  //     supabaseClient
  //       .from("profiles")
  //       .select("*")
  //       .eq("id", user?.id)
  //       .then(({ data, error }) => {
  //         // @ts-ignore
  //         setName(data[0].username || "Runner");
  //       });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   axios
  //     .get("https://api.chatengine.io/users/me", {
  //       headers: {
  //         "Project-ID": "73c96b36-c965-4222-8694-542786398ab3",
  //         "user-name": name,
  //         "user-secret": user?.id,
  //       },
  //     })
  //     .then(() => {})
  //     .catch(() => {
  //       let formdata = new FormData();
  //       // @ts-ignore
  //       formdata.append("email", user.email);
  //       // @ts-ignore
  //       formdata.append("username", user.displayName);
  //       // @ts-ignore
  //       formdata.append("secret", user.uid);
  //       axios
  //         .post("https://api.chatengine.io/users/", formdata, {
  //           headers: { "private-key": "6bc0ea91-9ee8-43dd-8bab-af5f0997deed" },
  //         })
  //         .catch((e) => {
  //           console.log("error-log", e.message);
  //         });
  //     });
  // }, [user]);
  // if (!user) {
  //   return "Loading...";
  // }

  // useEffect(() => {
  //   if (typeof document !== null) {
  //     setShowChat(true);
  //   }
  // }, []);

  // if (!showChat) return <div />;

  // const ChatEngine = dynamic(() =>
  //   import("react-chat-engine").then((module) => module.ChatEngine)
  // );

  return (
    <div className="w-full">
      {/* <ChatEngine
        // @ts-ignore
        projectID="73c96b36-c965-4222-8694-542786398ab3"
        userName={name}
        userSecret={user?.id}
        height="100vh"
      /> */}
    </div>
  );
}
