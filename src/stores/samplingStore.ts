import create from 'zustand';
import { supabase } from '../supabase/index';

export const useSamplingStore = create<any>((set) => ({
  samplings: [],
  getSamplings: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('samplings')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ samplings: data });
          return data;
        }
      });
    return data;
  },
  addSampling: async (userId: string, title: string, link: string, selectedProject: number) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('samplings').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getSamplings = useSamplingStore.getState().getSamplings;
    if (selectedProject) {
      getSamplings(selectedProject);
    }
  },
  deleteSampling: async (id: number) => {
    const { error } = await supabase.from('samplings').delete().eq('id', id);
  },
  editSampling: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('samplings')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
}));
