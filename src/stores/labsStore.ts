import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useLabsStore = create(
  persist(
    (set) => ({
      labs: [],
      filteredLabs: [],

      getLabs: async () => {
        const user = supabase.auth.user();
        const labs = JSON.parse(sessionStorage.getItem('labs'));
        await supabase
          .from('labs')
          .select('*')
          .eq('user_id', user?.id)
          .order('title', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (labs) {
                if (labs.state.labs.length != data.length) {
                  sessionStorage.removeItem('labs');
                  set({ labs: data });
                }
              } else {
                set({ labs: data });
              }
            }
          });
      },

      getFilteredLabs: async (id) => {
        const labs = useLabsStore.getState().labs;
        const newLab = labs.filter((lab) => lab.project_id == parseInt(id));
        set({ filteredLabs: newLab });
      },

      addLab: async (
        title: string,
        link: string,
        products: string,
        patents: string,
        equipment: string,
        instruments: string,
        email: string,
        phone_number: string,
        manager: string,
        selectedProject: number,
      ) => {
        const user = supabase.auth.user();
        const { data } = await supabase.from('labs').insert([
          {
            link,
            title,
            products,
            patents,
            equipment,
            instruments,
            email,
            phone_number,
            manager,
            user_id: user.id,
            project_id: selectedProject,
          },
        ]);
        set((state) => ({
          labs: [
            ...state.labs,
            {
              id: data[0].id,
              project_id: selectedProject,
              link,
              title,
              products,
              patents,
              equipment,
              instruments,
              email,
              phone_number,
              manager,
            },
          ],
        }));
      },

      deleteLab: async (id) => {
        await supabase.from('labs').delete().eq('id', id);
        set((state) => ({
          labs: state.labs.filter((lab) => lab.id !== id),
        }));
      },

      patchLab: async (
        id: number,
        title: string,
        link: string,
        products: string,
        patents: string,
        equipment: string,
        instruments: string,
        email: string,
        phone_number: string,
        manager: string,
        project_id: any,
      ) => {
        await supabase
          .from('labs')
          .update({
            title,
            link,
            products,
            patents,
            equipment,
            instruments,
            email,
            phone_number,
            manager,
            project_id,
          })
          .eq('id', id);
        set((state) => ({
          labs: state.labs.map((lab) =>
            lab.id === id
              ? {
                  ...lab,
                  title,
                  link,
                  products,
                  patents,
                  equipment,
                  instruments,
                  email,
                  phone_number,
                  manager,
                  project_id,
                }
              : lab,
          ),
        }));
      },
    }),
    { name: 'labs', getStorage: () => sessionStorage },
  ),
);
