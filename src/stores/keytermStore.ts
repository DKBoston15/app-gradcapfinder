import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useKeyTermStore = create(
  persist(
    (set) => ({
      keyTerms: [],
      filteredKeyTerms: [],

      getKeyTerms: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const key_terms = JSON.parse(sessionStorage.getItem('key_terms'));
        await supabase
          .from('key_terms')
          .select('*')
          .eq('user_id', user?.id)
          .order('name', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (key_terms) {
                if (key_terms.state.key_terms.length != data.length) {
                  set({ keyTerms: data });
                }
              } else {
                set({ keyTerms: data });
              }
            }
          });
      },

      getFilteredKeyTerms: async (id) => {
        const keyTerms = useKeyTermStore.getState().keyTerms;
        const newKeyTerm = keyTerms.filter((keyTerm) => keyTerm.project_id == parseInt(id));
        set({ filteredKeyTerms: newKeyTerm });
      },

      addKeyTerm: async (
        name: string,
        link: string,
        label: string,
        keyLiterature: string,
        connected_entity: string,
        primary: boolean,
        selectedProject: number,
      ) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data } = await supabase.from('key_terms').insert([
          {
            name,
            link,
            citations: label,
            key_literature: keyLiterature,
            user_id: user.id,
            project_id: selectedProject,
            primary,
            connected_entities: [connected_entity],
          },
        ]);
        set((state) => ({
          keyTerms: [
            ...state.keyTerms,
            {
              id: data[0].id,
              link,
              name,
              citations: label,
              project_id: selectedProject,
              primary,
              connected_entities: data[0].connected_entities,
              key_literature: keyLiterature,
            },
          ],
        }));
      },

      deleteKeyTerm: async (id) => {
        await supabase.from('key_terms').delete().eq('id', id);
        set((state) => ({
          keyTerms: state.keyTerms.filter((key_term) => key_term.id !== id),
        }));
      },

      patchKeyTerm: async (
        id: number,
        name: string,
        link: string,
        label: string,
        keyLiterature: string,
        primary: boolean,
        project_id: any,
      ) => {
        await supabase
          .from('key_terms')
          .update({
            name,
            link,
            citations: label,
            key_literature: keyLiterature,
            primary,
            project_id,
          })
          .eq('id', id);
        set((state) => ({
          keyTerms: state.keyTerms.map((keyTerm) =>
            keyTerm.id === id
              ? {
                  ...keyTerm,
                  name,
                  link,
                  citations: label,
                  key_literature: keyLiterature,
                  primary,
                  project_id,
                }
              : keyTerm,
          ),
        }));
      },

      addKeyTermConnection: async (id: number, connected_entity: any) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const data = await supabase
          .from('key_terms')
          .select('connected_entities')
          .eq('user_id', user?.id)
          .eq('id', id)
          .then(async ({ data, error }) => {
            if (!error) {
              let newConnectedEntities = data[0].connected_entities;
              if (newConnectedEntities) {
                newConnectedEntities.push(connected_entity);
              } else {
                newConnectedEntities = [connected_entity];
              }
              const newKeyTerm = await supabase
                .from('key_terms')
                .update({
                  connected_entities: newConnectedEntities,
                })
                .eq('id', id)
                .then(async ({ data, error }) => {
                  return data;
                });
              return newKeyTerm;
            }
          });

        set((state) => ({
          keyTerms: state.keyTerms.map((key_term) =>
            key_term.id === id
              ? { ...key_term, connected_entities: data[0].connected_entities }
              : key_term,
          ),
        }));

        return data;
      },

      removeKeyTermConnection: async (id: number, connected_entity: any) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const key_terms = useKeyTermStore.getState().keyTerms;
        let connectedKeyTerm = key_terms.find((el) => el.id === id);
        connectedKeyTerm.connected_entities = connectedKeyTerm.connected_entities.filter(
          (entity) => entity !== connected_entity,
        );
        set((state) => ({
          keyTerms: state.keyTerms.map((key_term) =>
            key_term.id === id
              ? { ...key_term, connected_entities: connectedKeyTerm.connected_entities }
              : key_term,
          ),
        }));

        await supabase
          .from('key_terms')
          .update({
            connected_entities: connectedKeyTerm.connected_entities,
          })
          .eq('id', id)
          .eq('user_id', user?.id);
      },
    }),
    { name: 'keyTerms', getStorage: () => sessionStorage },
  ),
);
