import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useAnalyticDesignsStore = create<any>((set) => ({
  analytic_designs: [],
  getAnalyticDesigns: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('analytic_designs')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ analytic_designs: data });
          return data;
        }
      });
    return data;
  },
  addAnalyticDesign: async (
    userId: string,
    title: string,
    link: string,
    design_technique: string,
    design_option: string,
    start_date: string,
    end_date: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('analytic_designs').insert([
      {
        link,
        title,
        design_technique,
        design_option,
        start_date,
        end_date,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.analytic_designs.push(data[0]);
      }),
    );
  },
  deleteAnalyticDesigns: async (id: number) => {
    const { error } = await supabase.from('analytic_designs').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.analytic_designs.findIndex((el) => el.id === id);
        draft.analytic_designs.splice(index, 1);
      }),
    );
  },
  editAnalyticDesign: async (
    id: number,
    title: string,
    link: string,
    design_technique: string,
    design_option: string,
    start_date: string,
    end_date: string,
  ) => {
    const { data, error } = await supabase
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

    set(
      produce((draft) => {
        const analytic_design = draft.analytic_designs.find((el) => el.id === data[0].id);
        analytic_design.title = data[0].title;
        analytic_design.link = data[0].link;
        analytic_design.design_technique = data[0].design_technique;
        analytic_design.design_option = data[0].design_option;
        analytic_design.start_date = data[0].start_date;
        analytic_design.end_date = data[0].end_date;
      }),
    );
  },
}));
