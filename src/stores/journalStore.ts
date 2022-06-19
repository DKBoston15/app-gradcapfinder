import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

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
    impact_score: string,
    editor: string,
    publication_freq: string,
    association: string,
    connected_entity: string,
    primary: boolean,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('journals').insert([
      {
        link,
        title,
        impact_score,
        editor,
        publication_freq,
        association,
        user_id: userId,
        project_id: selectedProject,
        primary,
        connected_entities: [connected_entity],
      },
    ]);
    set(
      produce((draft) => {
        draft.journals.push(data[0]);
      }),
    );
  },
  deleteJournal: async (id: number) => {
    const { error } = await supabase.from('journals').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.journals.findIndex((el) => el.id === id);
        draft.journals.splice(index, 1);
      }),
    );
  },
  editJournal: async (
    id: number,
    title: string,
    link: string,
    impact_score: string,
    editor: string,
    publication_freq: string,
    association: string,
    primary: boolean,
  ) => {
    const { data, error } = await supabase
      .from('journals')
      .update({
        title,
        link,
        impact_score,
        editor,
        publication_freq,
        association,
        primary,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const journal = draft.journals.find((el) => el.id === data[0].id);
        (journal.title = data[0].title), (journal.link = data[0].link);
        (journal.impactScore = data[0].impact_score), (journal.editor = data[0].editor);
        (journal.publicationFrequency = data[0].publication_freq),
          (journal.association = data[0].association);
      }),
    );
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
    set(
      produce((draft) => {
        draft.connectedJournals.push(data[0]);
      }),
    );
    return data;
  },
  removeJournalConnection: async (id: number, connected_entity: any) => {
    const user = supabase.auth.user();
    const { newConnectedEntities } = await supabase
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

          return { newConnectedEntities };
        }
      });
    set(
      produce((draft) => {
        const connectedJournal = draft.connectedJournals.find((el) => el.id === id);
        connectedJournal.connected_entities = newConnectedEntities;
      }),
    );
  },
}));
