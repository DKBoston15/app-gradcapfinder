import { Component } from "react";
import create from "zustand";
import { supabaseClient } from "../lib/client";
const user = supabaseClient.auth.user();

const realtimeKeytermUpdates = supabaseClient
  .from("key_terms")
  .on("*", (payload) => {
    const getKeyterms = useKeytermStore.getState().getKeyterms;
    const getSubKeyterms = useKeytermStore.getState().getSubKeyterms;
    getKeyterms();
    getSubKeyterms();
  })
  .subscribe();

const realtimeSubKeytermsUpdates = supabaseClient
  .from("subkeyterms")
  .on("*", (payload) => {
    const getSubKeyterms = useKeytermStore.getState().getSubKeyterms;
    getSubKeyterms();
  })
  .subscribe();

export const useKeytermStore = create<any>((set) => ({
  keyterms: [],
  subKeyterms: [],
  getKeyterms: async () => {
    supabaseClient
      .from("key_terms")
      .select("*")
      .eq("user_id", user?.id)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ keyterms: data });
        }
      });
  },
  getSubKeyterms: async () => {
    supabaseClient
      .from("subkeyterms")
      .select("*")
      .eq("user_id", user?.id)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ subKeyterms: data });
        }
      });
  },
  addKeyterm: async (title: string, link: string) => {
    const { error } = await supabaseClient
      .from("key_terms")
      .insert([{ title, link, user_id: user?.id }]);
  },
  addSubKeyterm: async (keyterm_id: number, title: string, link: string) => {
    const { error } = await supabaseClient
      .from("subkeyterms")
      .insert([{ keyterm_id, title, link, user_id: user?.id }]);
  },
  deleteKeyterm: async (id: number) => {
    supabaseClient
      .from("subkeyterms")
      .select("*")
      .eq("keyterm_id", id)
      .then(async ({ data, error }) => {
        if (!error) {
          // @ts-ignore
          for (let i = 0; i < data.length; i++) {
            await supabaseClient
              .from("subkeyterms")
              .delete()
              // @ts-ignore
              .eq("id", data[i].id);
          }
          await supabaseClient.from("key_terms").delete().eq("id", id);
        }
      });
  },
  deleteSubKeyterm: async (id: number) => {
    const { error } = await supabaseClient
      .from("subkeyterms")
      .delete()
      .eq("id", id);
  },
  editSubKeyterm: async (id: number, title: string, link: string) => {
    const { data, error } = await supabaseClient
      .from("subkeyterms")
      .update({ title, link })
      .eq("id", id);
  },
  editKeyterm: async (id: number, title: string, link: string) => {
    const { data, error } = await supabaseClient
      .from("key_terms")
      .update({ title, link })
      .eq("id", id);
  },
}));