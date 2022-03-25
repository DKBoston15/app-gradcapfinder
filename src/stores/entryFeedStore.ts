import create from "zustand";
import { supabase } from "../supabase/index";

export const useEntryFeedStore = create<any>((set) => ({
  entries: [],
  getEntries: async (connected_id: any) => {
    const user = supabase.auth.user();
    supabase
      .from("feed_entries")
      .select("*")
      .eq("user_id", user?.id)
      .eq("connected_id", connected_id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ entries: data });
        }
      });
  },
  addEntry: async (category: string, content: string, connected_id: string) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from("feed_entries").insert([
      {
        user_id: user?.id,
        category,
        content,
        connected_id,
      },
    ]);
    const getEntries = useEntryFeedStore.getState().getEntries;
    getEntries();
  },
  deleteEntry: async (id: number) => {
    const { error } = await supabase.from("feed_entries").delete().eq("id", id);
  },
  editEntry: async (id: number, content: string) => {
    const { data, error } = await supabase
      .from("feed_entries")
      .update({
        content,
      })
      .eq("id", id);
  },
}));
