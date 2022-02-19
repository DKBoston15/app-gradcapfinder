import create from "zustand";
import { supabaseClient } from "../lib/client";
const user = supabaseClient.auth.user();

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

export const useChatStore = create<any>((set) => ({
  messages: [],
  discussionsForUser: [],
  discussionsForAdmin: [],
  adminDiscussions: [],
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

    if (!error) {
      return data;
    } else {
      console.log(error);
    }
  },
  setDiscussionId: async (id: number) => {
    const user = supabaseClient.auth.user();
    if (id !== 0) {
      if (isAdmin()) {
        const { data, error } = await supabaseClient
          .from("message")
          .update({ admin_read: true })
          .eq("discussion_id", id)
          .eq("admin_read", false);
      }

      set({ selectedDiscussionId: id });
      let { data: messages } = await supabaseClient
        .from("message")
        .select("*")
        .eq("discussion_id", id)
        .order("created_at", { ascending: true });
      set({ messages: messages });
    }
  },
  getMessagesByDiscussionId: async (id: number) => {
    let { data: messages } = await supabaseClient
      .from("message")
      .select("*")
      .eq("discussion_id", id);
  },
  getAdminUnreadMessagesByDiscussionId: async (id: number) => {
    let { data: messages, count } = await supabaseClient
      .from("message")
      .select("*", { count: "exact" })
      .eq("discussion_id", id)
      .eq("admin_read", false);
    return count;
  },
  getUserUnreadMessagesByDiscussionId: async (id: number) => {
    let { data: messages, count } = await supabaseClient
      .from("message")
      .select("*", { count: "exact" })
      .eq("discussion_id", id)
      .eq("read", false);
    return count;
  },
  setMessages: (messages: any) => {
    set({ messages: messages });
  },
  addMessage: async (
    content: string,
    id: string,
    discussion_id: number,
    sent_from_admin: boolean,
    read: boolean,
    admin_read: boolean
  ) => {
    await supabaseClient.from("message").insert([
      {
        content,
        user_id: id,
        discussion_id,
        sent_from_admin,
        read,
        admin_read,
      },
    ]);
  },
}));
