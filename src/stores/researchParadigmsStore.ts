import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';
import { persist } from "zustand/middleware";

export const useResearchParadigmsStore = create(
  persist((set) => ({  
  research_paradigms: [],
  getResearchParadigms: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const researchParadigms = JSON.parse(sessionStorage.getItem('researchParadigms'));
    await supabase
      .from('research_paradigms')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          if (researchParadigms) {
            if (researchParadigms.state.research_paradigms.length != data.length) {
              set({ researchParadigms: data });
              sessionStorage.removeItem('researchParadigms');
            }
          }
        }
      });
    return researchParadigms;
  },
  addResearchParadigm: async (
    userId: string,
    title: string,
    link: string,
    category: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('research_paradigms').insert([
      {
        link,
        title,
        category,
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
  editResearchParadigm: async (id: number, title: string, link: string, category: string) => {
    const { data, error } = await supabase
      .from('research_paradigms')
      .update({
        title,
        link,
        category,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const research_paradigm = draft.research_paradigms.find((el) => el.id === data[0].id);
        research_paradigm.title = data[0].title;
        research_paradigm.link = data[0].link;
        research_paradigm.category = data[0].category;
      }),
    );
  },
}), {name: 'researchParadigms', getStorage: () => sessionStorage}));

