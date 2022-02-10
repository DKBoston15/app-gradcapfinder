import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useProfileStore } from "../../store/profileStore";
import { supabaseClient } from "../../lib/client";

export default function Messages({
  selectedDiscussion,
  adminName,
  messages,
}: any) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const getChatProfile = useProfileStore((state: any) => state.getChatProfile);
  const user = supabaseClient.auth.user();
  const getProfileImageUrl = useProfileStore(
    (state: any) => state.getProfileImageUrl
  );

  // @ts-ignore
  useEffect(async () => {
    const chatProfile = await getChatProfile(user?.id);
    if (chatProfile) {
      const url = await getProfileImageUrl(chatProfile.avatar_url);
      if (url) {
        setAvatarUrl(url);
      }
    }
  }, []);

  useEffect(() => {
    const el = document.getElementById("chat-feed");
    // id of the chat container ---------- ^^^
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      id="chat-feed"
      className="h-85/100 flex flex-col space-y-4 px-8 mb-4 overflow-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {/* @ts-ignore */}
      {messages.map((message) => (
        //   @ts-ignore
        <Message
          key={message.id}
          message={message}
          selectedDiscussion={selectedDiscussion}
          adminName={adminName}
          avatarUrl={avatarUrl}
        />
      ))}
    </div>
  );
}
