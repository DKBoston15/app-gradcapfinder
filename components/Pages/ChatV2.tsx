import React, { useEffect, useState, useRef } from "react";
import { supabaseClient } from "../../lib/client";
import Sidebar from "../ChatComponents/Sidebar";
import NewMessage from "../ChatComponents/NewMessage";
import Messages from "../ChatComponents/Messages";
import AdminSidebar from "../ChatComponents/AdminSidebar";
import AdminMessages from "../ChatComponents/AdminMessages";
import Header from "../ChatComponents/Header";
import AdminHeader from "../ChatComponents/AdminHeader";
import { useChatStore } from "../../store/chatStore";

export default function ChatV2() {
  const user = supabaseClient.auth.user();
  const message = useRef("");

  const discussionsForAdmin = useChatStore(
    (state: any) => state.discussionsForAdmin
  );

  const discussionsForUser = useChatStore(
    (state: any) => state.discussionsForUser
  );

  const getDiscussionsForUser = useChatStore(
    (state: any) => state.getDiscussionsForUser
  );
  const setDiscussionId = useChatStore((state: any) => state.setDiscussionId);
  const selectedDiscussionId = useChatStore(
    (state: any) => state.selectedDiscussionId
  );
  const messages = useChatStore((state: any) => state.messages);
  const addMessage = useChatStore((state: any) => state.addMessage);
  const [adminDiscussionIds, setAdminDiscussionIds] = useState({});

  useEffect(() => {
    if (isAdmin()) {
      //Get All Discussions for admin - set initial discussion ID to Dane - this sets selected messages to Dane
      setDiscussionId(discussionsForAdmin[0].id);
    }
    if (!isAdmin()) {
      setDiscussionId(discussionsForUser[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedDiscussionId !== 0) {
      let adminDiscussionIds = {};
      discussionsForUser.forEach((discussion: any) => {
        if (discussion.name === "Chat with Dr.Bozeman") {
          // @ts-ignore
          adminDiscussionIds["dane"] = discussion.id;
        }
        if (discussion.name === "Chat with Tech Support") {
          // @ts-ignore
          adminDiscussionIds["techSupport"] = discussion.id;
        }
      });
      setAdminDiscussionIds(adminDiscussionIds);
    }
  }, [selectedDiscussionId]);

  const isAdmin = () => {
    if (
      user?.id === process.env.NEXT_PUBLIC_DANE_USER_ID ||
      user?.id === process.env.NEXT_PUBLIC_TECH_USER_ID
    ) {
      return true;
    }
    return false;
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    //   @ts-ignore
    const content = message.current.value;

    if (
      user?.id === process.env.NEXT_PUBLIC_DANE_USER_ID ||
      user?.id === process.env.NEXT_PUBLIC_TECH_USER_ID
    ) {
      await addMessage(content, user?.id, selectedDiscussionId, true);
    } else {
      await addMessage(content, user?.id, selectedDiscussionId, false);
    }

    // @ts-ignore
    message.current.value = "";
  };

  const adminName = () => {
    const selectedDiscussion = discussionsForUser.filter(
      //@ts-ignore
      (discussion) => discussion.id === selectedDiscussionId
    );
    return selectedDiscussion[0].name;
  };

  return (
    <section className="flex w-full max-h-screen bg-dashGray dark:bg-completeBlack">
      {/* Dane & Dakota */}
      {isAdmin() && (
        <>
          <AdminSidebar
            setSelectedDiscussion={setDiscussionId}
            selectedDiscussion={selectedDiscussionId}
            discussions={discussionsForAdmin}
          />
          <div className="flex flex-col justify-end w-full">
            {discussionsForAdmin.length > 0 && (
              <AdminHeader
                selectedDiscussion={selectedDiscussionId}
                discussions={discussionsForAdmin}
              />
            )}
            <AdminMessages
              selectedMessages={messages}
              selectedDiscussion={selectedDiscussionId}
              user={user}
              discussions={discussionsForAdmin}
            />
            <NewMessage sendMessage={sendMessage} message={message} />
          </div>
        </>
      )}
      {/* General */}
      {!isAdmin() && selectedDiscussionId != 0 && (
        <>
          <Sidebar
            setSelectedDiscussion={setDiscussionId}
            selectedDiscussion={selectedDiscussionId}
            discussions={discussionsForUser}
            adminName={adminName()}
            adminDiscussionIds={adminDiscussionIds}
          />
          <div className="flex flex-col justify-end w-full">
            <Header
              selectedDiscussion={selectedDiscussionId}
              adminName={adminName()}
            />
            <Messages
              selectedDiscussion={selectedDiscussionId}
              adminName={adminName()}
              messages={messages}
            />
            <NewMessage sendMessage={sendMessage} message={message} />
          </div>
        </>
      )}
    </section>
  );
}
