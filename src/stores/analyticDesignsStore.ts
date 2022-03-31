import create from 'zustand';
import { supabase } from '../supabase/index';

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
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('analytic_designs').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getAnalyticDesigns = useAnalyticDesignsStore.getState().getAnalyticDesigns;
    if (selectedProject) {
      getAnalyticDesigns(selectedProject);
    }
  },
  deleteAnalyticDesigns: async (id: number) => {
    const { error } = await supabase.from('analytic_designs').delete().eq('id', id);
  },
  editAnalyticDesign: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('analytic_designs')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
}));
