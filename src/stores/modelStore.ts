import create from 'zustand';
import { supabase } from '../supabase/index';

export const useModelStore = create<any>((set) => ({
  models: [],
  getModels: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('models')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ models: data });
          return data;
        }
      });
    return data;
  },
  addModel: async (userId: string, title: string, link: string, selectedProject: number) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('models').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getModels = useModelStore.getState().getModels;
    if (selectedProject) {
      getModels(selectedProject);
    }
  },
  deleteModel: async (id: number) => {
    const { error } = await supabase.from('models').delete().eq('id', id);
  },
  editModel: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('models')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
}));
