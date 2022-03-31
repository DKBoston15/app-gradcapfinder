import create from 'zustand';
import { supabase } from '../supabase/index';

export const useLabsStore = create<any>((set) => ({
  labs: [],
  getLabs: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('labs')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ labs: data });
          return data;
        }
      });
    return data;
  },
  addLab: async (userId: string, title: string, link: string, selectedProject: number) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('labs').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getLabs = useLabsStore.getState().getLabs;
    if (selectedProject) {
      getLabs(selectedProject);
    }
  },
  deleteLab: async (id: number) => {
    const { error } = await supabase.from('labs').delete().eq('id', id);
  },
  editLab: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('labs')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
}));
