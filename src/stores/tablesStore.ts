import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useTablesStore = create<any>((set) => ({
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
    const { data, error } = await supabase.from('tables').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.tables.push(data[0]);
      }),
    );
  },
  deleteTable: async (id: number) => {
    const { error } = await supabase.from('tables').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.tables.findIndex((el) => el.id === id);
        draft.tables.splice(index, 1);
      }),
    );
  },
  editTable: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('tables')
      .update({
        title,
        link,
      })
      .eq('id', id);
    set(
      produce((draft) => {
        const table = draft.tables.find((el) => el.id === data[0].id);
        (table.title = data[0].title), (table.link = data[0].link);
      }),
    );
  },
}));
