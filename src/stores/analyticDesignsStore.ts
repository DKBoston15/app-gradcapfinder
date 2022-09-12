import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';
import { AnalyticDesign, AnalyticDesignState } from './types/analyticDesigns.types';

export const useAnalyticDesignsStore = create<AnalyticDesignState>(
  persist(
    (set) => ({
      analytic_designs: <AnalyticDesign[]>[],
      filteredAnalyticDesigns: <AnalyticDesign[]>[],

      getFilteredAnalyticDesigns: async (id: string) => {
        const analytic_designs = useAnalyticDesignsStore.getState().analytic_designs;
        const newAnalyticDesigns = analytic_designs.filter(
          (analytic_design) => analytic_design.project_id == id,
        );
        set({ filteredAnalyticDesigns: newAnalyticDesigns });
      },

      getAnalyticDesigns: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const analytic_designs = JSON.parse(sessionStorage.getItem('AnalyticDesigns') || '');
        await supabase
          .from('analytic_designs')
          .select('*')
          .eq('user_id', user?.id)
          .order('title', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (analytic_designs) {
                if (analytic_designs.state.analytic_designs.length != data.length) {
                  sessionStorage.removeItem('AnalyticDesigns');
                  set({ analytic_designs: data });
                }
              } else {
                set({ analytic_designs: data });
              }
            }
          });
      },

      addAnalyticDesign: async (newAnalyticDesign: AnalyticDesign) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data } = await supabase.from('analytic_designs').insert([
          {
            link: newAnalyticDesign.link,
            title: newAnalyticDesign.title,
            design_technique: newAnalyticDesign.design_technique,
            design_option: newAnalyticDesign.design_option,
            start_date: newAnalyticDesign.start_date,
            end_date: newAnalyticDesign.end_date,
            user_id: user?.id,
            project_id: newAnalyticDesign.project_id,
          },
        ]);
        0.0;
        if (data) {
          set((state) => ({
            analytic_designs: [
              ...state.analytic_designs,
              {
                id: data[0].id,
                project_id: newAnalyticDesign.project_id,
                link: newAnalyticDesign.link,
                title: newAnalyticDesign.title,
                design_technique: newAnalyticDesign.design_technique,
                design_option: newAnalyticDesign.design_option,
                start_date: newAnalyticDesign.start_date,
                end_date: newAnalyticDesign.end_date,
              },
            ],
          }));
        }
      },

      deleteAnalyticDesign: async (id: string) => {
        await supabase.from('analytic_designs').delete().eq('id', id);
        set((state) => ({
          analytic_designs: state.analytic_designs.filter(
            (analytic_design) => analytic_design.id !== id,
          ),
        }));
      },

      patchAnalyticDesign: async (updatedAnalyticDesign: AnalyticDesign) => {
        await supabase
          .from('analytic_designs')
          .update({
            title: updatedAnalyticDesign.title,
            link: updatedAnalyticDesign.link,
            design_technique: updatedAnalyticDesign.design_technique,
            design_option: updatedAnalyticDesign.design_option,
            start_date: updatedAnalyticDesign.start_date,
            end_date: updatedAnalyticDesign.end_date,
            project_id: updatedAnalyticDesign.project_id,
          })
          .eq('id', updatedAnalyticDesign.id);
        set((state) => ({
          analytic_designs: state.analytic_designs.map((analytic_design: AnalyticDesign) =>
            analytic_design.id === updatedAnalyticDesign.id
              ? {
                  ...analytic_design,
                  title: updatedAnalyticDesign.title,
                  link: updatedAnalyticDesign.link,
                  design_technique: updatedAnalyticDesign.design_technique,
                  design_option: updatedAnalyticDesign.design_option,
                  start_date: updatedAnalyticDesign.start_date,
                  end_date: updatedAnalyticDesign.end_date,
                  project_id: updatedAnalyticDesign.project_id,
                }
              : analytic_design,
          ),
        }));
      },
    }),
    { name: 'AnalyticDesigns', getStorage: () => sessionStorage },
  ),
);
