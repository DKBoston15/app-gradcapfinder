import create from 'zustand';
import { supabase } from '../supabase/index';

export const useSamplingDesignsStore = create<any>((set) => ({
  sampling_designs: [],
  getSamplingDesigns: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('sampling_designs')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ sampling_designs: data });
          return data;
        }
      });
    return data;
  },
  addSamplingDesign: async (
    userId: string,
    title: string,
    link: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('sampling_designs').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getSamplingDesigns = useSamplingDesignsStore.getState().getSamplingDesigns;
    if (selectedProject) {
      getSamplingDesigns(selectedProject);
    }
  },
  deleteSamplingDesign: async (id: number) => {
    const { error } = await supabase.from('sampling_designs').delete().eq('id', id);
  },
  editSamplingDesign: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('sampling_designs')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
}));
