import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useAnalyticDesignsStore = create(
  persist((set) => ({

    analytic_designs: [],

    getAnalyticDesigns: async () => {
    const user = supabase.auth.user();
    const analytic_designs = JSON.parse(sessionStorage.getItem('AnalyticDesigns'));
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

addAnalyticDesign: async (    
  title: string,
  link: string,
  design_technique: string,
  design_option: string,
  start_date: string,
  end_date: string,
  selectedProject: number,
) => {
  const user = supabase.auth.user();
  const { data } = await supabase.from('analytic_designs').insert([
    {
      link,
      title,
      design_technique,
      design_option,
      start_date,
      end_date,
      user_id: user.id,
      project_id: selectedProject,
    },
  ]);
  set((state) => ({
    analytic_designs: [...state.analytic_designs, { id: data[0].id, project_id: selectedProject, link, title, design_option, design_technique, start_date, end_date }]
  }))},

  deleteAnalyticDesign: async (id) => {
      await supabase.from('analytic_designs').delete().eq('id', id);
      set((state) => ({
        analytic_designs: state.analytic_designs.filter((analytic_design) => analytic_design.id !== id)
      }))},

  patchAnalyticDesign: async (
    id: number,
    title: string,
    link: string,
    design_technique: string,
    design_option: string,
    start_date: string,
    end_date: string,
  ) => {
    await supabase
    .from('analytic_designs')
    .update({
      title,
      link,
      design_technique,
      design_option,
      start_date,
      end_date,
    })
    .eq('id', id);
    set((state) => ({
      analytic_designs: state.analytic_designs.map((analytic_design) =>
      analytic_design.id === id
      ? ({ ...analytic_design, title, link, design_technique, design_option, start_date, end_date})
      : analytic_design
    ),
    }))},

  }), {name: 'AnalyticDesigns', getStorage: () => sessionStorage})
);