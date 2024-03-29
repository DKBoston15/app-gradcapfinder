import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useTablesStore = create(
  persist(
    (set) => ({
      tables: [],
      filteredTables: [],

      getFilteredTables: async (id) => {
        const tables = useTablesStore.getState().tables;
        const newTables = tables.filter((table) => table.project_id == parseInt(id));
        set({ filteredTables: newTables });
      },

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

      addTable: async (title: string, link: string, selectedProject: number) => {
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
          tables: [...state.tables, { id: data[0].id, link, title, project_id: selectedProject }],
        }));
      },

      deleteTable: async (id) => {
        await supabase.from('tables').delete().eq('id', id);
        set((state) => ({
          tables: state.tables.filter((table) => table.id !== id),
        }));
      },

      patchTable: async (id: number, title: string, link: string, project_id: any) => {
        await supabase
          .from('tables')
          .update({
            title,
            link,
            project_id,
          })
          .eq('id', id);
        set((state) => ({
          tables: state.tables.map((table) =>
            table.id === id ? { ...table, title, link, project_id } : table,
          ),
        }));
      },
    }),
    { name: 'tables', getStorage: () => sessionStorage },
  ),
);
