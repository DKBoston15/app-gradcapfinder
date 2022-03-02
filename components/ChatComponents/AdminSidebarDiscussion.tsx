import React, { useState, useEffect } from "react";
import { useProfileStore } from "../../store/profileStore";
// @ts-ignore
import Identicon from "react-identicons";
import { useChatStore } from "../../store/chatStore";

export default function AdminSidebarDiscussion({
  index,
  selectedDiscussion,
  discussion,
}: any) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [count, setCount] = useState(0);
  const [lastMessage, setLastMessage] = useState("");
  const messages = useChatStore((state: any) => state.messages);
  const getProfileImageUrl = useProfileStore(
    (state: any) => state.getProfileImageUrl
  );
  const getAdminUnreadMessagesByDiscussionId = useChatStore(
    (state: any) => state.getAdminUnreadMessagesByDiscussionId
  );
  const getMessagesByDiscussionId = useChatStore(
    (state: any) => state.getMessagesByDiscussionId
  );

  const truncateMessage = (name: string) => {
    if (name.length > 15) {
      setLastMessage(name.substring(0, 12) + "...");
    } else {
      setLastMessage(name);
    }
  };

  // @ts-ignore
  useEffect(async () => {
    const url = await getProfileImageUrl(discussion.profiles.avatar_url);
    if (index != 0) {
      const unreadCount = await getAdminUnreadMessagesByDiscussionId(
        discussion.id
      );
      setCount(unreadCount);
    }
    if (url) {
      setAvatarUrl(url);
    } else {
      setAvatarUrl("");
    }
  }, []);

  // @ts-ignore
  useEffect(async () => {
    const messages = await getMessagesByDiscussionId(discussion.id);
    const lastMessagePreDisplay = messages[messages.length - 1];
    if (lastMessagePreDisplay) {
      truncateMessage(lastMessagePreDisplay.content);
    }
  }, [messages]);

  useEffect(() => {
    if (selectedDiscussion == discussion.id) {
      setCount(0);
    }
  }, [selectedDiscussion]);

  return (
    <div className="w-full flex items-center space-x-4">
      <div className="flex justify-between">
        {!avatarUrl && <Identicon string={discussion.profiles.id} size={55} />}
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="My profile"
            className="inline object-cover w-12 h-12 order-1 rounded-full"
          />
        )}
        {count != 0 && (
          <div className="order-3 bg-primary rounded-full text-white font-semibold h-8 w-8 flex justify-center items-center">
            {count}
          </div>
        )}
      </div>

      <div className="order-2">
        <div className="font-semibold whitespace-nowrap">
          {`${discussion.profiles.first_name} ${discussion.profiles.last_name}` ||
            "Runner"}
        </div>
        {lastMessage && <div className="text-gray">{lastMessage}</div>}
      </div>
    </div>
  );
}
