import React, { useEffect, useState, useRef } from "react";
import { supabaseClient } from "../../lib/client";
import Sidebar from "../ChatComponents/Sidebar";
import Search from "../ChatComponents/Search";
import Messages from "../ChatComponents/Messages";

export default function ChatV2() {
  const user = supabaseClient.auth.user();
  const [daneMessages, setDaneMessages] = useState([]);
  const [dakotaMessages, setDakotaMessages] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState();
  const message = useRef("");
  const [users, setUsers] = useState({});
  const [daneDiscussionId, setDaneDiscussionId] = useState();
  const [dakotaDiscussionId, setDakotaDiscussionId] = useState();

  //@ts-ignore
  useEffect(async () => {
    let localDaneDiscussionId = 0;
    let localDakotaDiscussionId = 0;
    const checkForDiscussions = async () => {
      const { data: discussions, error } = await supabaseClient
        .from("discussions")
        .select("*")
        // @ts-ignore
        .eq("user_1", user.id);

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
        setSelectedDiscussion(localDaneDiscussionId);
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
      console.log(messages2);
      //@ts-ignore
      setDakotaMessages(messages2);
    };
    await getMessages();

    const setupMessagesSubscription = async () => {
      console.log(daneDiscussionId);
      supabaseClient
        .from("message")
        .on("INSERT", (payload) => {
          if (payload.new.discussion_id === daneDiscussionId) {
            setDaneMessages((previous) => [].concat(previous, payload.new));
          } else {
            setDakotaMessages((previous) => [].concat(previous, payload.new));
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
  }, []);

  const getUsersFromSupabase = async (users: any, userIds: any) => {
    //@ts-ignore
    const usersToGet = Array.from(userIds).filter((userId) => !users[userId]);
    if (Object.keys(users).length && usersToGet.length == 0) return users;

    const { data } = await supabaseClient
      .from("profiles")
      //@ts-ignore
      .select("id, first_name")
      .in("id", usersToGet);

    const newUsers = {};
    //@ts-ignore
    data?.forEach((user) => (newUsers[user.id] = user));
    return Object.assign({}, users, newUsers);
  };

  //   //@ts-ignore
  //   useEffect(async () => {
  //     const getUsers = async () => {
  //       //@ts-ignore
  //       const userIds = new Set(messages.map((message) => message.user_id));
  //       const newUsers = await getUsersFromSupabase(users, userIds);
  //       //@ts-ignore
  //       setUsers(newUsers);
  //     };

  //     await getUsers();
  //   }, [dakotaMessages, daneMessages]);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    //   @ts-ignore
    const content = message.current.value;

    if (
      //@ts-ignore
      user.id === "10ee67d0-fff4-4315-8d21-7ce612aaca4d" ||
      //@ts-ignore
      user.id === "1c2c6c8d-93f8-4d89-ac49-71d7cd138e5f"
    ) {
      await supabaseClient.from("message").insert([
        // @ts-ignore
        {
          content,
          // @ts-ignore
          user_id: user.id,
          discussion_id: selectedDiscussion,
          sent_from_admin: true,
        },
      ]);
    } else {
      await supabaseClient.from("message").insert([
        // @ts-ignore
        { content, user_id: user.id, discussion_id: selectedDiscussion },
      ]);
    }

    // @ts-ignore
    message.current.value = "";
  };

  //   const username = (user_id: any) => {
  //     //@ts-ignore
  //     const user = users[user_id];
  //     if (!user) return "Loading";
  //     return user.first_name ? user.first_name : "Runner";
  //   };

  return (
    <section className="flex w-full min-h-screen bg-dashGray">
      <Sidebar
        setSelectedDiscussion={setSelectedDiscussion}
        selectedDiscussion={selectedDiscussion}
        daneDiscussionId={daneDiscussionId}
        dakotaDiscussionId={dakotaDiscussionId}
      />
      <div className="flex flex-col justify-between w-full">
        <Messages
          daneMessages={daneMessages}
          selectedDiscussion={selectedDiscussion}
          daneDiscussionId={daneDiscussionId}
          dakotaMessages={dakotaMessages}
          dakotaDiscussionId={dakotaDiscussionId}
        />
        <Search sendMessage={sendMessage} message={message} />
      </div>
    </section>
  );
}
