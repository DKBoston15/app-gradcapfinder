import create from 'zustand';
import { supabase } from '../supabase/index';

export const useTableStore = create<any>((set) => ({
  tables: [],
  getTables: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('tables')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ tables: data });
          return data;
        }
      });
    return data;
  },
  addTable: async (userId: string, title: string, link: string, selectedProject: number) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('tables').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getTables = useTableStore.getState().getTables;
    if (selectedProject) {
      getTables(selectedProject);
    }
  },
  deleteTable: async (id: number) => {
    const { error } = await supabase.from('tables').delete().eq('id', id);
  },
  editTable: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('tables')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
}));
