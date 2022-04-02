import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useKeyTermStore = create<any>((set) => ({
  keyTerms: [],
  connectedKeyTerms: [],
  getKeyTerms: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('key_terms')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ keyTerms: data });
          return data;
        }
      });
    return data;
  },
  getConnectedKeyTerms: async (selectedProject: any, connected_entity: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('key_terms')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .contains('connected_entities', [connected_entity])
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ connectedKeyTerms: data });
          return data;
        }
      });
    return data;
  },
  addKeyTerm: async (
    userId: string,
    title: string,
    link: string,
    connected_entity: string,
    primary: boolean,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('key_terms').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
        primary,
        connected_entities: [connected_entity],
      },
    ]);
    set(
      produce((draft) => {
        draft.keyTerms.push(data[0]);
      }),
    );
  },
  deleteKeyTerm: async (id: number) => {
    const { error } = await supabase.from('key_terms').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.keyTerms.findIndex((el) => el.id === id);
        draft.keyTerms.splice(index, 1);
      }),
    );
  },
  editKeyTerm: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('key_terms')
      .update({
        title,
        link,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const keyTerm = draft.keyTerms.find((el) => el.id === data[0].id);
        (keyTerm.title = data[0].title), (keyTerm.link = data[0].link);
      }),
    );
  },
  addKeyTermConnection: async (id: number, connected_entity: any) => {
    const user = supabase.auth.user();
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
    set(
      produce((draft) => {
        draft.connectedKeyTerms.push(data[0]);
      }),
    );
    return data;
  },
  removeKeyTermConnection: async (id: number, connected_entity: any) => {
    const user = supabase.auth.user();
    const { newConnectedEntities } = await supabase
      .from('key_terms')
      .select('connected_entities')
      .eq('user_id', user?.id)
      .eq('id', id)
      .then(async ({ data, error }) => {
        if (!error) {
          const newConnectedEntities = data[0].connected_entities.filter(
            (e: any) => e !== connected_entity,
          );
          await supabase
            .from('key_terms')
            .update({
              connected_entities: newConnectedEntities,
            })
            .eq('id', id);

          return { newConnectedEntities };
        }
      });
    set(
      produce((draft) => {
        const connectedKeyTerm = draft.connectedKeyTerms.find((el) => el.id === id);
        connectedKeyTerm.connected_entities = newConnectedEntities;
      }),
    );
  },
}));
