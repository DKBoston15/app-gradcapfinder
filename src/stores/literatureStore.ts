import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useLiteratureStore = create(
  persist(
    (set) => ({
      literature: [],
      filteredLiterature: [],

      getLiterature: async () => {
        const user = supabase.auth.user();
        const literature = JSON.parse(sessionStorage.getItem('literature'));
        await supabase
          .from('literature')
          .select('*')
          .eq('user_id', user?.id)
          .order('title', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (literature) {
                if (literature.state.literature.length != data.length) {
                  sessionStorage.removeItem('literature');
                  set({ literature: data });
                }
              } else {
                set({ literature: data });
              }
            }
          });
      },

      getFilteredLiterature: async (id) => {
        const literature = useLiteratureStore.getState().literature;
        const newLit = literature.filter((lit) => lit.project_id == parseInt(id));
        set({ filteredLiterature: newLit });
      },

      addLiterature: async (
        research_paradigm: string,
        sampling_design: string,
        sampling_technique: string,
        analytic_design: string[],
        research_design: string,
        authors: string[],
        year: string,
        title: string,
        journal: string,
        volume: string,
        issue: string,
        start_page: string,
        end_page: string,
        link: string,
        selectedProject: number,
      ) => {
        const user = supabase.auth.user();
        const { data } = await supabase.from('literature').insert([
          {
            research_paradigm,
            sampling_design,
            sampling_technique,
            analytic_design,
            research_design,
            authors,
            year,
            journal,
            volume,
            issue,
            start_page,
            end_page,
            link,
            title,
            user_id: user.id,
            project_id: selectedProject,
          },
        ]);
        set((state) => ({
          literature: [
            ...state.literature,
            {
              id: data[0].id,
              research_paradigm,
              research_design,
              sampling_design,
              sampling_technique,
              analytic_design,
              authors,
              year,
              journal,
              volume,
              issue,
              start_page,
              end_page,
              link,
              title,
              user_id: user?.id,
              project_id: selectedProject,
            },
          ],
        }));
      },

      deleteLiterature: async (id) => {
        await supabase.from('literature').delete().eq('id', id);
        set((state) => ({
          literature: state.literature.filter((literature) => literature.id !== id),
        }));
      },

      patchLiterature: async (
        id: number,
        research_paradigm: string,
        sampling_design: string,
        sampling_technique: string,
        analytic_design: string[],
        research_design: string,
        authors: string[],
        year: string,
        title: string,
        journal: string,
        volume: string,
        issue: string,
        start_page: string,
        end_page: string,
        link: string,
        project_id: any,
      ) => {
        await supabase
          .from('literature')
          .update({
            research_paradigm,
            sampling_design,
            sampling_technique,
            analytic_design,
            research_design,
            authors,
            year,
            title,
            journal,
            volume,
            issue,
            start_page,
            end_page,
            link,
            project_id,
          })
          .eq('id', id);
        set((state) => ({
          literature: state.literature.map((literature) =>
            literature.id === id
              ? {
                  ...literature,
                  research_design,
                  research_paradigm,
                  sampling_design,
                  sampling_technique,
                  analytic_design,
                  authors,
                  year,
                  title,
                  journal,
                  volume,
                  issue,
                  start_page,
                  end_page,
                  link,
                  project_id,
                }
              : literature,
          ),
        }));
      },
    }),
    { name: 'literature', getStorage: () => sessionStorage },
  ),
);
