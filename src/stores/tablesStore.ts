import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useTablesStore = create(
  persist((set) => ({

    tables: [],

    getTables: async () => {
    const user = supabase.auth.user();
    const tables = JSON.parse(sessionStorage.getItem('tables'));
    await supabase
    .from('tables')
    .select('*')
    .eq('user_id', user?.id)
    .order('title', { ascending: true })
    .then(({ data, error }) => {
      if (!error) {
        if (tables) {
          if (tables.state.tables.length != data.length) {
            sessionStorage.removeItem('tables');
            set({ tables: data });
          }
        } else {
          set({ tables: data });
        }
      }
    });

},

addTable: async (    
  title: string,
  link: string,
  selectedProject: number,
) => {
  const user = supabase.auth.user();
  const { data } = await supabase.from('tables').insert([
    {
      link,
      title,
      user_id: user.id,
      project_id: selectedProject,
    },
  ]);
  set((state) => ({
    tables: [...state.tables, { id: data[0].id, link, title, project_id: selectedProject }]
  }))},

  deleteTable: async (id) => {
      await supabase.from('tables').delete().eq('id', id);
      set((state) => ({
        tables: state.tables.filter((table) => table.id !== id)
      }))},

  patchTable: async (
    id: number, title: string, link: string
  ) => {
    await supabase
    .from('tables')
    .update({
      title,
      link,
    })
    .eq('id', id);
    set((state) => ({
      tables: state.tables.map((table) =>
      table.id === id
      ? ({ ...table, title, link})
      : table
    ),
    }))},

  }), {name: 'tables', getStorage: () => sessionStorage})
);