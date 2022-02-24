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
import Dropdown from "../Dropdown";
import useSound from "use-sound";

export default function ChatV2({ setCurrentPage }: any) {
  const message = useRef("");
  const [play] = useSound("/sounds/ChatMessage.mp3", {
    volume: 0.2,
  });

  const discussionsForAdmin = useChatStore(
    (state: any) => state.discussionsForAdmin
  );

  const discussionsForUser = useChatStore(
    (state: any) => state.discussionsForUser
  );

  const getDiscussionsForAdmin = useChatStore(
    (state: any) => state.getDiscussionsForAdmin
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
  const getMessagesByDiscussionId = useChatStore(
    (state: any) => state.getMessagesByDiscussionId
  );
  const [adminDiscussionIds, setAdminDiscussionIds] = useState({});
  const user = supabaseClient.auth.user();

  useEffect(() => {
    const realtimeAdminMessageUpdates = supabaseClient
      .from("message")
      .on("INSERT", (payload) => {
        setDiscussionId(selectedDiscussionId);
      })
      .subscribe();
  }, []);

  // @ts-ignore
  useEffect(async () => {
    if (discussionsForUser && discussionsForAdmin) {
      try {
        if (isAdmin()) {
          setDiscussionId(discussionsForAdmin[0].id);
        }
        if (!isAdmin()) {
          setDiscussionId(discussionsForUser[0].id);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (discussionsForUser) {
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
        setAdminDiscussionIds(adminDiscussionIds);
      });
    }
  }, [discussionsForUser]);

  useEffect(() => {
    setDiscussionId(selectedDiscussionId);
  }, [selectedDiscussionId]);

  const isAdmin = () => {
    try {
      if (
        user?.id === process.env.NEXT_PUBLIC_DANE_USER_ID ||
        user?.id === process.env.NEXT_PUBLIC_TECH_USER_ID
      ) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    //   @ts-ignore
    const content = message.current.value;

    if (
      user?.id === process.env.NEXT_PUBLIC_DANE_USER_ID ||
      user?.id === process.env.NEXT_PUBLIC_TECH_USER_ID
    ) {
      await addMessage(
        content,
        user?.id,
        selectedDiscussionId,
        true,
        false,
        true
      );
    } else {
      await addMessage(
        content,
        user?.id,
        selectedDiscussionId,
        false,
        true,
        false
      );
    }
    play();

    // @ts-ignore
    message.current.value = "";
  };

  const adminName = () => {
    try {
      const selectedDiscussion = discussionsForUser.filter(
        //@ts-ignore
        (discussion) => discussion.id === selectedDiscussionId
      );
      if (selectedDiscussion[0]) {
        return selectedDiscussion[0].name;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex w-full max-h-screen bg-dashGray dark:bg-dark">
      <div className="absolute right-4 top-4">
        <Dropdown setCurrentPage={setCurrentPage} user={user} />
      </div>
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
      {!isAdmin() && (
        <>
          <Sidebar
            setSelectedDiscussion={setDiscussionId}
            selectedDiscussion={selectedDiscussionId}
            discussions={discussionsForUser}
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
