import create from 'zustand';
import { supabase } from '../supabase/index';

export const useSamplingTechniquesStore = create<any>((set) => ({
  sampling_techniques: [],
  getSamplingTechniques: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('sampling_techniques')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ sampling_techniques: data });
          return data;
        }
      });
    return data;
  },
  addSamplingTechnique: async (
    userId: string,
    title: string,
    link: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('sampling_techniques').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getSamplingTechniques = useSamplingTechniquesStore.getState().getSamplingTechniques;
    if (selectedProject) {
      getSamplingTechniques(selectedProject);
    }
  },
  deleteSamplingTechnique: async (id: number) => {
    const { error } = await supabase.from('sampling_techniques').delete().eq('id', id);
  },
  editSamplingTechnique: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('sampling_techniques')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
}));
