import create from "zustand";
import { supabase } from "../supabase/index";

export const useJournalStore = create<any>((set) => ({
  journals: [],
  getJournals: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from("journals")
      .select("*")
      .eq("user_id", user?.id)
      .eq("project_id", selectedProject)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ articles: data });
          return data;
        }
      });
    return data;
  },
  addJournal: async (
    userId: string,
    title: string,
    link: string,
    selectedProject: number
  ) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from("journals").insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getJournals = useJournalStore.getState().getJournals;
    if (selectedProject) {
      getJournals(selectedProject);
    }
  },
  deleteJournal: async (id: number) => {
    const { error } = await supabase.from("journals").delete().eq("id", id);
  },
  editJournal: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from("journals")
      .update({
        title,
        link,
      })
      .eq("id", id);
  },
}));
