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
      .order('name', { ascending: true })
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
      .order('name', { ascending: true })
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
    name: string,
    link: string,
    citations: string,
    keyArticle: string,
    connected_entity: string,
    primary: boolean,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('key_terms').insert([
      {
        link,
        name,
        citations,
        key_article: keyArticle,
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
  editKeyTerm: async (
    id: number,
    name: string,
    link: string,
    citations: string,
    keyArticle: string,
  ) => {
    const { data, error } = await supabase
      .from('key_terms')
      .update({
        name,
        link,
        citations,
        key_article: keyArticle,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const keyTerm = draft.keyTerms.find((el) => el.id === data[0].id);
        (keyTerm.name = data[0].name), (keyTerm.link = data[0].link);
        (keyTerm.citations = data[0].citations), (keyTerm.keyArticle = data[0].key_article);
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
