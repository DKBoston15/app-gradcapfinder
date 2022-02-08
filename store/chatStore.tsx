import create from "zustand";
import { supabaseClient } from "../lib/client";

const realtimeDiscussionForUser1Updates = supabaseClient
  .from("discussions")
  .on("*", (payload) => {
    const user = supabaseClient.auth.user();
    const getDiscussionsForUser1 =
      useChatStore.getState().getDiscussionsForUser1;
    getDiscussionsForUser1(user?.id);
  })
  .subscribe();

const realtimeAdminMessageUpdates = supabaseClient
  .from("message")
  .on("INSERT", (payload) => {
    const setMessages = useChatStore.getState().setMessages;
    const messages = useChatStore.getState().messages;
    const newMessages = [].concat(...messages, payload.new);
    setMessages(newMessages);
  })
  .subscribe();

export const useChatStore = create<any>((set) => ({
  messages: [],
  discussionsForUser: [],
  discussionsForAdmin: [],
  adminDiscussions: [],
  daneDiscussionId: 0,
  techDiscussionId: 0,
  danesMessages: [],
  techSupportMessages: [],
  selectedDiscussionId: 0,
  getDiscussionsForUser: async (id: string) => {
    const { data: discussions, error } = await supabaseClient
      .from("discussions")
      .select("*")
      .eq("user_1", id);
    set({ discussionsForUser: discussions });
  },
  getDiscussionsForAdmin: async (id: string) => {
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
      .eq("user_2", id);
    set({ discussionsForAdmin: discussions });
  },
  addDefaultDiscussions: async (id: string, adminId: string, name: string) => {
    const { data, error } = await supabaseClient.from("discussions").insert({
      user_1: id,
      user_2: adminId,
      name: name,
    });
  },
  setDiscussionId: async (id: string) => {
    const user = supabaseClient.auth.user();
    set({ selectedDiscussionId: id });
    let { data: messages } = await supabaseClient
      .from("message")
      .select("*")
      .eq("discussion_id", id);
    set({ messages: messages });
  },
  getMessagesByDiscussionId: async (id: number) => {
    let { data: messages } = await supabaseClient
      .from("message")
      .select("*")
      .eq("discussion_id", id);
  },
  getAdminMessages: async (
    daneDiscussionId: number,
    techDiscussionId: number
  ) => {
    let { data: messages } = await supabaseClient
      .from("message")
      .select("*")
      .eq("discussion_id", daneDiscussionId);

    set({ danesMessages: messages });

    let { data: messages2 } = await supabaseClient
      .from("message")
      .select("*")
      .eq("discussion_id", techDiscussionId);

    set({ techSupportMessages: messages2 });
  },
  setMessages: (messages: any) => {
    set({ messages: messages });
  },
  addMessage: async (
    content: string,
    id: string,
    discussion_id: number,
    sent_from_admin: boolean
  ) => {
    await supabaseClient.from("message").insert([
      {
        content,
        user_id: id,
        discussion_id,
        sent_from_admin,
      },
    ]);
  },
}));
