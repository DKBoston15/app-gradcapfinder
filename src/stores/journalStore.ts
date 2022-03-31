import create from 'zustand';
import { supabase } from '../supabase/index';

export const useJournalStore = create<any>((set) => ({
  journals: [],
  connectedJournals: [],
  getJournals: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('journals')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ journals: data });
          return data;
        }
      });
    return data;
  },
  getConnectedJournals: async (selectedProject: any, connected_entity: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('journals')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .contains('connected_entities', [connected_entity])
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ connectedJournals: data });
          return data;
        }
      });
    return data;
  },
  addJournal: async (
    userId: string,
    title: string,
    link: string,
    connected_entity: string,
    primary: boolean,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('journals').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
        primary,
        connected_entities: [connected_entity],
      },
    ]);
    const getJournals = useJournalStore.getState().getJournals;
    if (selectedProject) {
      getJournals(selectedProject);
    }
  },
  deleteJournal: async (id: number) => {
    const { error } = await supabase.from('journals').delete().eq('id', id);
  },
  editJournal: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('journals')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
  addJournalConnection: async (id: number, connected_entity: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('journals')
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
          const newJournal = await supabase
            .from('journals')
            .update({
              connected_entities: newConnectedEntities,
            })
            .eq('id', id)
            .then(async ({ data, error }) => {
              return data;
            });
          return newJournal;
        }
      });
    return data;
  },
  removeJournalConnection: async (id: number, connected_entity: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('journals')
      .select('connected_entities')
      .eq('user_id', user?.id)
      .eq('id', id)
      .then(async ({ data, error }) => {
        if (!error) {
          const newConnectedEntities = data[0].connected_entities.filter(
            (e: any) => e !== connected_entity,
          );
          await supabase
            .from('journals')
            .update({
              connected_entities: newConnectedEntities,
            })
            .eq('id', id);
        }
      });
  },
}));
