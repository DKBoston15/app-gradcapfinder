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

  console.log(selectedMessages);

  return (
    <div
      id="messages"
      className="h-85/100 flex flex-col space-y-4 px-8 mb-4 overflow-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
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
