import create from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabase/index';

const useChecklistStore = create(
  persist(
    (set) => ({
      checklists: [],

      getChecklists: async () => {
        const user = supabase.auth.user();
        const checklists = JSON.parse(sessionStorage.getItem('checklists'));
        await supabase
          .from('checklists')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (checklists) {
                if (checklists.state.checklists.length != data.length) {
                  sessionStorage.removeItem('checklists');
                  set({ checklists: data });
                }
              } else {
                set({ checklists: data });
              }
            }
          });
      },

      addChecklist: async (newChecklist) => {
        const user = supabase.auth.user();
        const { data } = await supabase.from('checklists').insert([
          {
            checklist: newChecklist.checklist,
            name: newChecklist.name,
            user_id: user.id,
          },
        ]);
        set((state) => ({
          checklists: [
            ...state.checklists,
            { id: data[0].id, checklist: newChecklist.checklist, name: newChecklist.name },
          ],
        }));
      },

      removeChecklist: async (id) => {
        await supabase.from('checklists').delete().eq('id', id);
        set((state) => ({
          checklists: state.checklists.filter((checklist) => checklist.id !== id),
        }));
      },

      patchChecklist: async (updatedChecklist) => {
        const checklists = useChecklistStore.getState().checklists;
        const data = checklists.map((checklist) =>
          checklist.id === updatedChecklist.id
            ? { ...updatedChecklist, checklist: updatedChecklist.checklist }
            : checklist,
        );

        set((state) => ({
          checklists: [...data],
        }));

        await supabase
          .from('checklists')
          .update({
            checklist: updatedChecklist.checklist,
            name: updatedChecklist.name,
          })
          .eq('id', updatedChecklist.id);
      },
      updateChecklistName: async (id, name) => {
        const checklists = useChecklistStore.getState().checklists;
        const data = checklists.map((checklist) =>
          checklist.id === id ? { ...checklist, name } : checklist,
        );

        set((state) => ({
          checklists: [...data],
        }));

        await supabase
          .from('checklists')
          .update({
            name,
          })
          .eq('id', id);
      },
    }),
    { name: 'checklists', getStorage: () => sessionStorage },
  ),
);

export default useChecklistStore;
