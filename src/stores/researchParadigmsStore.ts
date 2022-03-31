import create from 'zustand';
import { supabase } from '../supabase/index';

export const useResearchParadigmsStore = create<any>((set) => ({
  research_paradigms: [],
  getResearchParadigms: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('research_paradigms')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ research_paradigms: data });
          return data;
        }
      });
    return data;
  },
  addResearchParadigm: async (
    userId: string,
    title: string,
    link: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('research_paradigms').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getResearchParadigms = useResearchParadigmsStore.getState().getResearchParadigms;
    if (selectedProject) {
      getResearchParadigms(selectedProject);
    }
  },
  deleteResearchParadigm: async (id: number) => {
    const { error } = await supabase.from('research_paradigms').delete().eq('id', id);
  },
  editResearchParadigm: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('research_paradigms')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
}));
