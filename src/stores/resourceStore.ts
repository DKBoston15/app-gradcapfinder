import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useResourceStore = create(
  persist(
    (set) => ({
      resources: [],

      getResources: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const resources = JSON.parse(sessionStorage.getItem('resources'));
        await supabase
          .from('resources')
          .select('*')
          .eq('user_id', user?.id)
          .order('title', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (resources) {
                if (resources.state.resources.length != data.length) {
                  sessionStorage.removeItem('resources');
                  set({ resources: data });
                }
              } else {
                set({ resources: data });
              }
            }
          });
      },

      addResource: async (title: string, description: string, link: string, section: string) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data } = await supabase.from('resources').insert([
          {
            link,
            title,
            description,
            section: JSON.stringify(section),
            user_id: user.id,
          },
        ]);
        set((state) => ({
          resources: [
            ...state.resources,
            { id: data[0].id, link, title, description, section: JSON.stringify(section) },
          ],
        }));
      },

      deleteResource: async (id) => {
        await supabase.from('resources').delete().eq('id', id);
        set((state) => ({
          resources: state.resources.filter((resource) => resource.id !== id),
        }));
      },

      patchResource: async (
        id: number,
        title: string,
        description: string,
        link: string,
        section: string,
      ) => {
        await supabase
          .from('resources')
          .update({
            title,
            link,
            description,
            section: JSON.stringify(section),
          })
          .eq('id', id);
        set((state) => ({
          resources: state.resources.map((resource) =>
            resource.id === id
              ? { ...resource, title, link, description, section: JSON.stringify(section) }
              : resource,
          ),
        }));
      },
    }),
    { name: 'resources', getStorage: () => sessionStorage },
  ),
);
