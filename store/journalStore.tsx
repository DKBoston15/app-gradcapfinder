import { Component } from "react";
import create from "zustand";
import { supabaseClient } from "../lib/client";
const user = supabaseClient.auth.user();

const realtimeJournalUpdates = supabaseClient
  .from("journals")
  .on("*", (payload) => {
    const getJournals = useJournalStore.getState().getJournals;
    const getSubjournals = useJournalStore.getState().getSubjournals;
    getJournals();
    getSubjournals();
  })
  .subscribe();

const realtimeSubJournalUpdates = supabaseClient
  .from("subjournals")
  .on("*", (payload) => {
    const getSubjournals = useJournalStore.getState().getSubjournals;
    getSubjournals();
  })
  .subscribe();

export const useJournalStore = create<any>((set) => ({
  journals: [],
  subjournals: [],
  getJournals: async () => {
    supabaseClient
      .from("journals")
      .select("*")
      .eq("user_id", user?.id)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ journals: data });
        }
      });
  },
  getSubjournals: async () => {
    supabaseClient
      .from("subjournals")
      .select("*")
      .eq("user_id", user?.id)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ subjournals: data });
        }
      });
  },
  addJournal: async (title: string, link: string) => {
    const { error } = await supabaseClient
      .from("journals")
      .insert([{ title, link, user_id: user?.id }]);
  },
  addSubjournal: async (journal_id: number, title: string, link: string) => {
    const { error } = await supabaseClient
      .from("subjournals")
      .insert([{ journal_id, title, link, user_id: user?.id }]);
  },
  deleteJournal: async (id: number) => {
    supabaseClient
      .from("subjournals")
      .select("*")
      .eq("journal_id", id)
      .then(async ({ data, error }) => {
        if (!error) {
          // @ts-ignore
          for (let i = 0; i < data.length; i++) {
            await supabaseClient
              .from("subjournals")
              .delete()
              // @ts-ignore
              .eq("id", data[i].id);
          }
          await supabaseClient.from("journals").delete().eq("id", id);
        }
      });
  },
  deleteSubjournal: async (id: number) => {
    const { error } = await supabaseClient
      .from("subjournals")
      .delete()
      .eq("id", id);
  },
  editSubJournal: async (id: number, title: string, link: string) => {
    const { data, error } = await supabaseClient
      .from("subjournals")
      .update({ title, link })
      .eq("id", id);
  },
  editJournal: async (id: number, title: string, link: string) => {
    const { data, error } = await supabaseClient
      .from("journals")
      .update({ title, link })
      .eq("id", id);
  },
}));
