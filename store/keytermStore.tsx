import { Component } from "react";
import create from "zustand";
import { supabaseClient } from "../lib/client";

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
    const user = supabaseClient.auth.user();
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
    const user = supabaseClient.auth.user();
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
    const user = supabaseClient.auth.user();
    const { error } = await supabaseClient
      .from("key_terms")
      .insert([{ title, link, user_id: user?.id }]);
  },
  addSubKeyterm: async (keyterm_id: number, title: string, link: string) => {
    const user = supabaseClient.auth.user();
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
  editSubKeyterm: async (
    id: number,
    title: string,
    link: string,
    citations: string,
    key_article: string
  ) => {
    const { data, error } = await supabaseClient
      .from("subkeyterms")
      .update({ title, link, citations, key_article })
      .eq("id", id);
  },
  editKeyterm: async (
    id: number,
    title: string,
    link: string,
    citations: string,
    key_article: string
  ) => {
    const { data, error } = await supabaseClient
      .from("key_terms")
      .update({ title, link, citations, key_article })
      .eq("id", id);
  },
  updateKeytermTags: async (id: string, tags: any[]) => {
    const { data, error } = await supabaseClient
      .from("key_terms")
      .update({
        authors: tags,
      })
      .eq("id", id);
  },
  updateSubKeytermTags: async (id: string, tags: any[]) => {
    const { data, error } = await supabaseClient
      .from("subkeyterms")
      .update({
        authors: tags,
      })
      .eq("id", id);
  },
}));
