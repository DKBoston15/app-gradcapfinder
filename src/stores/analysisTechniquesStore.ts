import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useAnalysisTechniquesStore = create<any>((set) => ({
  analysis_techniques: [],
  getAnalysisTechniques: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('analysis_techniques')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
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
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('analysis_techniques').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.analysis_techniques.push(data[0]);
      }),
    );
  },
  deleteAnalysisTechnique: async (id: number) => {
    const { error } = await supabase.from('analysis_techniques').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.analysis_techniques.findIndex((el) => el.id === id);
        draft.analysis_techniques.splice(index, 1);
      }),
    );
  },
  editAnalysisTechnique: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('analysis_techniques')
      .update({
        title,
        link,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const analysis_technique = draft.analysis_techniques.find((el) => el.id === data[0].id);
        (analysis_technique.title = data[0].title), (analysis_technique.link = data[0].link);
      }),
    );
  },
}));
