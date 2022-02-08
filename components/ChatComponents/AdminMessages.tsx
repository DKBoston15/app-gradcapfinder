import React, { useState, useEffect } from "react";
import AdminMessage from "./AdminMessage";
import { useProfileStore } from "../../store/profileStore";

export default function AdminMessages({
  selectedMessages,
  selectedDiscussion,
  user,
  discussions,
}: any) {
  const getChatProfile = useProfileStore((state: any) => state.getChatProfile);
  const getProfileImageUrl = useProfileStore(
    (state: any) => state.getProfileImageUrl
  );
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(async () => {
    if (selectedDiscussion && selectedMessages) {
      const selectedDiscussionNonAdmin = discussions.filter(
        (discussion) => discussion.id == selectedDiscussion
      );

      const chatProfile = await getChatProfile(
        selectedDiscussionNonAdmin[0].profiles.id
      );

      const url = await getProfileImageUrl(chatProfile.avatar_url);

      if (url) {
        setAvatarUrl(url);
      } else {
        setAvatarUrl("");
      }
    }
  }, [selectedDiscussion]);

  useEffect(() => {
    const el = document.getElementById("chat-feed");
    // id of the chat container ---------- ^^^
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [selectedMessages]);

  return (
    <div
      id="chat-feed"
      className="h-85/100 flex flex-col space-y-4 px-8 overflow-scroll"
    >
      {selectedMessages && selectedDiscussion && (
        <>
          {/* @ts-ignore */}
          {selectedMessages.map((message) => (
            <>
              {message && (
                //   @ts-ignore
                <AdminMessage
                  key={message.id}
                  message={message}
                  user={user}
                  avatarUrl={avatarUrl}
                />
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
}
