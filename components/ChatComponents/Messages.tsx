import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useProfileStore } from "../../store/profileStore";
import { supabaseClient } from "../../lib/client";

export default function Messages({
  daneMessages,
  selectedDiscussion,
  daneDiscussionId,
  dakotaMessages,
  dakotaDiscussionId,
}: any) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const getChatProfile = useProfileStore((state: any) => state.getChatProfile);
  const user = supabaseClient.auth.user();
  const getProfileImageUrl = useProfileStore(
    (state: any) => state.getProfileImageUrl
  );

  useEffect(async () => {
    const chatProfile = await getChatProfile(user?.id);
    if (chatProfile) {
      const url = await getProfileImageUrl(chatProfile.avatar_url);
      if (url) {
        setAvatarUrl(url);
      }
    }
  }, []);

  return (
    <div
      id="messages"
      className="h-85/100 flex flex-col space-y-4 px-8 mb-4 overflow-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {daneMessages && selectedDiscussion === daneDiscussionId && (
        <>
          {/* @ts-ignore */}
          {daneMessages.map((message) => (
            //   @ts-ignore
            <Message
              key={message.id}
              message={message}
              selectedDiscussion={selectedDiscussion}
              daneDiscussionId={daneDiscussionId}
              dakotaDiscussionId={dakotaDiscussionId}
              avatarUrl={avatarUrl}
            />
          ))}
        </>
      )}
      {dakotaMessages && selectedDiscussion === dakotaDiscussionId && (
        <>
          {/* @ts-ignore */}
          {dakotaMessages.map((message) => (
            //   @ts-ignore
            <Message
              key={message.id}
              message={message}
              selectedDiscussion={selectedDiscussion}
              daneDiscussionId={daneDiscussionId}
              dakotaDiscussionId={dakotaDiscussionId}
              avatarUrl={avatarUrl}
            />
          ))}
        </>
      )}
    </div>
  );
}
