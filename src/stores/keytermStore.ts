import create from "zustand";
import { supabase } from "../supabase/index";

export const useKeyTermStore = create<any>((set) => ({
  keyTerms: [],
  getKeyTerms: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from("key_terms")
      .select("*")
      .eq("user_id", user?.id)
      .eq("project_id", selectedProject)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ keyTerms: data });
          return data;
        }
      });
    return data;
  },
  addKeyTerm: async (
    userId: string,
    title: string,
    link: string,
    selectedProject: number
  ) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from("key_terms").insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getKeyTerms = useKeyTermStore.getState().getKeyTerms;
    if (selectedProject) {
      getKeyTerms(selectedProject);
    }
  },
  deleteKeyTerm: async (id: number) => {
    const { error } = await supabase.from("key_terms").delete().eq("id", id);
  },
  editKeyTerm: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from("key_terms")
      .update({
        title,
        link,
      })
      .eq("id", id);
  },
}));
