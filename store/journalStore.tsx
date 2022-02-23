import create from "zustand";
import { supabaseClient } from "../lib/client";

export const useJournalStore = create<any>((set) => ({
  journals: [],
  subjournals: [],
  getJournals: async () => {
    const user = supabaseClient.auth.user();
    supabaseClient
      .from("journals")
      .select("*")
      .eq("user_id", user?.id)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        console.log(error);
        if (!error) {
          // @ts-ignore
          set({ journals: data });
        }
      });
  },
  getSubjournals: async () => {
    const user = supabaseClient.auth.user();
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
    const user = supabaseClient.auth.user();
    const { error } = await supabaseClient
      .from("journals")
      .insert([{ title, link, user_id: user?.id }]);
    const getJournals = useJournalStore.getState().getJournals;
    getJournals();
  },
  addSubjournal: async (journal_id: number, title: string, link: string) => {
    const user = supabaseClient.auth.user();
    const { error } = await supabaseClient
      .from("subjournals")
      .insert([{ journal_id, title, link, user_id: user?.id }]);
    const getSubjournals = useJournalStore.getState().getSubjournals;
    getSubjournals();
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
  editSubJournal: async (
    id: number,
    title: string,
    link: string,
    impact_score: string,
    editor: string,
    association: string,
    publication_freq: string,
    key_article: string
  ) => {
    const { data, error } = await supabaseClient
      .from("subjournals")
      .update({
        title,
        link,
        impact_score,
        editor,
        association,
        publication_freq,
        key_article,
      })
      .eq("id", id);
  },
  editJournal: async (
    id: number,
    title: string,
    link: string,
    impact_score: string,
    editor: string,
    association: string,
    publication_freq: string,
    key_article: string
  ) => {
    const { data, error } = await supabaseClient
      .from("journals")
      .update({
        title,
        link,
        impact_score,
        editor,
        association,
        publication_freq,
        key_article,
      })
      .eq("id", id);
  },
}));
