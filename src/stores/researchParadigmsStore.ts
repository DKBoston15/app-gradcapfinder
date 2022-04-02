import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

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
    const { data, error } = await supabase.from('research_paradigms').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.research_paradigms.push(data[0]);
      }),
    );
  },
  deleteResearchParadigm: async (id: number) => {
    const { error } = await supabase.from('research_paradigms').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.research_paradigms.findIndex((el) => el.id === id);
        draft.research_paradigms.splice(index, 1);
      }),
    );
  },
  editResearchParadigm: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('research_paradigms')
      .update({
        title,
        link,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const research_paradigm = draft.research_paradigms.find((el) => el.id === data[0].id);
        (research_paradigm.title = data[0].title), (research_paradigm.link = data[0].link);
      }),
    );
  },
}));
