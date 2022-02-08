import React, { useEffect, useState, useRef } from "react";
import { supabaseClient } from "../../lib/client";
import Sidebar from "../ChatComponents/Sidebar";
import NewMessage from "../ChatComponents/NewMessage";
import Messages from "../ChatComponents/Messages";
import AdminSidebar from "../ChatComponents/AdminSidebar";
import AdminMessages from "../ChatComponents/AdminMessages";
import Header from "../ChatComponents/Header";
import AdminHeader from "../ChatComponents/AdminHeader";

export default function ChatV2() {
  const user = supabaseClient.auth.user();
  const [daneMessages, setDaneMessages] = useState([]);
  const [dakotaMessages, setDakotaMessages] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState();
  const message = useRef("");
  const [users, setUsers] = useState({});
  const [daneDiscussionId, setDaneDiscussionId] = useState();
  const [dakotaDiscussionId, setDakotaDiscussionId] = useState();
  const [discussions, setDiscussions] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);

  //@ts-ignore
  useEffect(async () => {
    if (user?.id) {
      if (
        user?.id !== "10ee67d0-fff4-4315-8d21-7ce612aaca4d" &&
        user?.id !== "1c2c6c8d-93f8-4d89-ac49-71d7cd138e5f"
      ) {
        let localDaneDiscussionId = 0;
        let localDakotaDiscussionId = 0;
        const checkForDiscussions = async () => {
          const { data: discussions, error } = await supabaseClient
            .from("discussions")
            .select("*")
            .eq("user_1", user?.id);

          // @ts-ignore
          if (discussions.length === 0) {
            const { data, error } = await supabaseClient
              .from("discussions")
              .insert([
                //TODO UPDATE WITH PRODUCTION VALUES
                {
                  user_1: user?.id,
                  user_2: "10ee67d0-fff4-4315-8d21-7ce612aaca4d",
                  name: "Chat with Dr.Bozeman",
                },
                {
                  user_1: user?.id,
                  user_2: "1c2c6c8d-93f8-4d89-ac49-71d7cd138e5f",
                  name: "Chat with Dakota",
                },
              ]);
          } else {
            //   @ts-ignore
            discussions.forEach((discussion) => {
              discussion.name === "Chat with Dr.Bozeman"
                ? setDaneDiscussionId(discussion.id)
                : setDakotaDiscussionId(discussion.id);
              discussion.name === "Chat with Dr.Bozeman"
                ? (localDaneDiscussionId = discussion.id)
                : (localDakotaDiscussionId = discussion.id);
            });
            //@ts-ignore
            if (!selectedDiscussion) {
              // @ts-ignore
              setSelectedDiscussion(localDaneDiscussionId);
            }
          }
        };
        await checkForDiscussions();

        const getMessages = async () => {
          let { data: messages } = await supabaseClient
            .from("message")
            .select("*")
            .eq("discussion_id", localDaneDiscussionId);

          //@ts-ignore
          setDaneMessages(messages);

          let { data: messages2 } = await supabaseClient
            .from("message")
            .select("*")
            .eq("discussion_id", localDakotaDiscussionId);
          //@ts-ignore
          setDakotaMessages(messages2);
        };
        await getMessages();

        const setupMessagesSubscription = async () => {
          supabaseClient
            .from("message")
            .on("INSERT", (payload) => {
              if (payload.new.discussion_id === daneDiscussionId) {
                setDaneMessages((previous) => [].concat(previous, payload.new));
              } else {
                setDakotaMessages((previous) =>
                  [].concat(previous, payload.new)
                );
              }
            })
            .subscribe();
        };

        await setupMessagesSubscription();

        const setupUsersSubscription = async () => {
          await supabaseClient
            .from("profiles")
            .on("UPDATE", (payload) => {
              setUsers((users) => {
                //@ts-ignore
                const user = users[payload.new.id];
                if (user) {
                  return Object.assign({}, users, {
                    [payload.new.id]: payload.new,
                  });
                } else {
                  return users;
                }
              });
            })
            .subscribe();
        };
        await setupUsersSubscription();
      }
    }
  }, [user]);

  useEffect(async () => {
    if (user?.id) {
      if (
        user?.id === "10ee67d0-fff4-4315-8d21-7ce612aaca4d" ||
        user?.id === "1c2c6c8d-93f8-4d89-ac49-71d7cd138e5f"
      ) {
        const checkForDiscussions = async () => {
          let { data: discussions, error } = await supabaseClient
            .from("discussions")
            .select(
              `
                  *,
                  profiles (
                    id,
                    first_name,
                    last_name,
                    avatar_url
                  )
                `
            )
            .eq("user_2", user?.id);
          // @ts-ignore
          discussions = discussions.filter(
            (discussion) =>
              discussion.user_1 != "10ee67d0-fff4-4315-8d21-7ce612aaca4d"
          );
          discussions = discussions.filter(
            (discussion) =>
              discussion.user_1 != "1c2c6c8d-93f8-4d89-ac49-71d7cd138e5f"
          );
          // @ts-ignore
          setDiscussions(
            // @ts-ignore
            discussions.sort(
              (a, b) => b.profiles.first_name - a.profiles.first_name
            )
          );
          //@ts-ignore
          if (!selectedDiscussion) {
            setSelectedDiscussion(discussions[0].id);
          }
          return discussions;
        };
        await checkForDiscussions();

        const getMessages = async () => {
          console.log(selectedDiscussion);
          let { data: messages } = await supabaseClient
            .from("message")
            .select("*")
            .eq("discussion_id", selectedDiscussion);

          //@ts-ignore
          setSelectedMessages(messages);
        };
        await getMessages();

        const setupMessagesSubscription = async () => {
          supabaseClient
            .from("message")
            .on("INSERT", (payload) => {
              setSelectedMessages((previous) =>
                [].concat(previous, payload.new)
              );
            })
            .subscribe();
        };

        await setupMessagesSubscription();
      }
    }
  }, [user]);

  useEffect(async () => {
    let { data: messages } = await supabaseClient
      .from("message")
      .select("*")
      .eq("discussion_id", selectedDiscussion);

    //@ts-ignore
    setSelectedMessages(messages);
  }, [selectedDiscussion]);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    //   @ts-ignore
    const content = message.current.value;

    if (
      user?.id === "10ee67d0-fff4-4315-8d21-7ce612aaca4d" ||
      user?.id === "1c2c6c8d-93f8-4d89-ac49-71d7cd138e5f"
    ) {
      await supabaseClient.from("message").insert([
        {
          content,
          user_id: user?.id,
          discussion_id: selectedDiscussion,
          sent_from_admin: true,
        },
      ]);
    } else {
      await supabaseClient
        .from("message")
        .insert([
          { content, user_id: user?.id, discussion_id: selectedDiscussion },
        ]);
    }

    // @ts-ignore
    message.current.value = "";
  };

  return (
    <section className="flex w-full min-h-screen bg-dashGray dark:bg-completeBlack">
      {/* Dane & Dakota */}
      {user?.id === "10ee67d0-fff4-4315-8d21-7ce612aaca4d" && (
        <>
          <AdminSidebar
            setSelectedDiscussion={setSelectedDiscussion}
            selectedDiscussion={selectedDiscussion}
            discussions={discussions}
          />
          <div className="flex flex-col justify-end w-full">
            {discussions.length > 0 && (
              <AdminHeader
                selectedDiscussion={selectedDiscussion}
                discussions={discussions}
              />
            )}
            <AdminMessages
              selectedMessages={selectedMessages}
              selectedDiscussion={selectedDiscussion}
              user={user}
              discussions={discussions}
            />
            <NewMessage sendMessage={sendMessage} message={message} />
          </div>
        </>
      )}
      {user?.id === "1c2c6c8d-93f8-4d89-ac49-71d7cd138e5f" && (
        <>
          <AdminSidebar
            setSelectedDiscussion={setSelectedDiscussion}
            selectedDiscussion={selectedDiscussion}
            discussions={discussions}
          />
          <div className="flex flex-col justify-end w-full">
            {discussions.length > 0 && (
              <AdminHeader
                selectedDiscussion={selectedDiscussion}
                discussions={discussions}
              />
            )}
            <AdminMessages
              selectedMessages={selectedMessages}
              selectedDiscussion={selectedDiscussion}
              user={user}
              discussions={discussions}
            />
            <NewMessage sendMessage={sendMessage} message={message} />
          </div>
        </>
      )}
      {/* General */}
      {user?.id !== "1c2c6c8d-93f8-4d89-ac49-71d7cd138e5f" &&
        user?.id !== "10ee67d0-fff4-4315-8d21-7ce612aaca4d" && (
          <>
            <Sidebar
              setSelectedDiscussion={setSelectedDiscussion}
              selectedDiscussion={selectedDiscussion}
              daneDiscussionId={daneDiscussionId}
              dakotaDiscussionId={dakotaDiscussionId}
            />
            <div className="flex flex-col justify-end w-full">
              <Header
                selectedDiscussion={selectedDiscussion}
                daneDiscussionId={daneDiscussionId}
              />
              <Messages
                daneMessages={daneMessages}
                selectedDiscussion={selectedDiscussion}
                daneDiscussionId={daneDiscussionId}
                dakotaMessages={dakotaMessages}
                dakotaDiscussionId={dakotaDiscussionId}
              />
              <NewMessage sendMessage={sendMessage} message={message} />
            </div>
          </>
        )}
    </section>
  );
}
