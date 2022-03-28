import create from "zustand";
import { supabase } from "../supabase/index";

export const useAnalysisTechniquesStore = create<any>((set) => ({
  analysis_techniques: [],
  getAnalysisTechniques: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from("analysis_techniques")
      .select("*")
      .eq("user_id", user?.id)
      .eq("project_id", selectedProject)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ analysis_techniques: data });
          return data;
        }
      });
    return data;
  },
  addAnalysisTechnique: async (
    userId: string,
    title: string,
    link: string,
    selectedProject: number
  ) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from("analysis_techniques").insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getAnalysisTechniques =
      useAnalysisTechniquesStore.getState().getAnalysisTechniques;
    if (selectedProject) {
      getAnalysisTechniques(selectedProject);
    }
  },
  deleteAnalysisTechnique: async (id: number) => {
    const { error } = await supabase
      .from("analysis_techniques")
      .delete()
      .eq("id", id);
  },
  editAnalysisTechnique: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from("analysis_techniques")
      .update({
        title,
        link,
      })
      .eq("id", id);
  },
}));
