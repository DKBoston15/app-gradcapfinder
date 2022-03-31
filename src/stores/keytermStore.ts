import create from 'zustand';
import { supabase } from '../supabase/index';

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
    const getKeyTerms = useKeyTermStore.getState().getKeyTerms;
    if (selectedProject) {
      getKeyTerms(selectedProject);
    }
  },
  deleteKeyTerm: async (id: number) => {
    const { error } = await supabase.from('key_terms').delete().eq('id', id);
  },
  editKeyTerm: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('key_terms')
      .update({
        title,
        link,
      })
      .eq('id', id);
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
    return data;
  },
  removeKeyTermConnection: async (id: number, connected_entity: any) => {
    const user = supabase.auth.user();
    const data = await supabase
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
        }
      });
  },
}));
