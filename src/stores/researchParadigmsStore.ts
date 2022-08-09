import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useResearchParadigmsStore = create(
  persist(
    (set) => ({
      research_paradigms: [],
      filteredResearchParadigms: [],

      getFilteredResearchParadigms: async (id) => {
        const research_paradigms = useResearchParadigmsStore.getState().research_paradigms;
        const newResearchParadigms = research_paradigms.filter(
          (research_paradigm) => research_paradigm.project_id == parseInt(id),
        );
        set({ filteredResearchParadigms: newResearchParadigms });
      },

      getResearchParadigms: async () => {
        const user = supabase.auth.user();
        const research_paradigms = JSON.parse(sessionStorage.getItem('researchParadigms'));
        await supabase
          .from('research_paradigms')
          .select('*')
          .eq('user_id', user?.id)
          .order('title', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (research_paradigms) {
                if (research_paradigms.state.research_paradigms.length != data.length) {
                  sessionStorage.removeItem('researchParadigms');
                  set({ research_paradigms: data });
                }
              } else {
                set({ research_paradigms: data });
              }
            }
          });
      },

      addResearchParadigm: async (
        title: string,
        link: string,
        category: string,
        selectedProject: number,
      ) => {
        const user = supabase.auth.user();
        const { data } = await supabase.from('research_paradigms').insert([
          {
            link,
            title,
            category,
            user_id: user.id,
            project_id: selectedProject,
          },
        ]);
        set((state) => ({
          research_paradigms: [
            ...state.research_paradigms,
            { id: data[0].id, link, title, category, project_id: selectedProject },
          ],
        }));
      },

      deleteResearchParadigm: async (id) => {
        await supabase.from('research_paradigms').delete().eq('id', id);
        set((state) => ({
          research_paradigms: state.research_paradigms.filter(
            (research_paradigm) => research_paradigm.id !== id,
          ),
        }));
      },

      patchResearchParadigm: async (
        id: number,
        title: string,
        link: string,
        category: string,
        project_id: any,
      ) => {
        await supabase
          .from('research_paradigms')
          .update({
            title,
            link,
            category,
            project_id,
          })
          .eq('id', id);
        set((state) => ({
          research_paradigms: state.research_paradigms.map((research_paradigm) =>
            research_paradigm.id === id
              ? { ...research_paradigm, title, link, category, project_id }
              : research_paradigm,
          ),
        }));
      },
    }),
    { name: 'researchParadigms', getStorage: () => sessionStorage },
  ),
);
