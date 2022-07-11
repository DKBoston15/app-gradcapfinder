import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useJournalStore = create(
  persist((set) => ({

  journals: [],
  filteredJournals: [],

  getFilteredJournals: async (id) => {
    const journals = useJournalStore.getState().journals;
    const newJournals = journals.filter((journal) => journal.project_id == parseInt(id));
    set({ filteredJournals: newJournals });
  },
  

  getJournals: async () => {
    const user = supabase.auth.user();
    const journals = JSON.parse(sessionStorage.getItem('journals'));
    await supabase
    .from('journals')
    .select('*')
    .eq('user_id', user?.id)
    .order('title', { ascending: true })
    .then(({ data, error }) => {
      if (!error) {
        if (journals) {
          if (journals.state.journals.length != data.length) {
            sessionStorage.removeItem('journals');
            set({ journals: data });
          }
        } else {
          set({ journals: data }); 
        }
      }
    });

},

addJournal: async (    
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
  const { data } = await supabase.from('journals').insert([
    {
        link,
        title,
        impact_score,
        editor,
        publication_freq,
        association,
        user_id: user.id,
        project_id: selectedProject,
        primary,
        connected_entities: [connected_entity],
    },
  ]);
  set((state) => ({
    journals: [...state.journals, { id: data[0].id, link, title, impact_score, editor, publication_freq, association, project_id: selectedProject, primary, connected_entities: data[0].connected_entities  }]
  }))},

    deleteJournal: async (id) => {
      await supabase.from('journals').delete().eq('id', id);
      set((state) => ({
        journals: state.journals.filter((journal) => journal.id !== id)
      }))},

  patchJournal: async (
    id: number,
    title: string,
    link: string,
    impact_score: string,
    editor: string,
    publication_freq: string,
    association: string,
    primary: boolean,
  ) => {
    await supabase
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
    set((state) => ({
      journals: state.journals.map((journal) =>
      journal.id === id
      ? ({ ...journal, title, link, impact_score, editor, publication_freq, association, primary})
      : journal
    ),
    }))},

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

      set((state) => ({
        journals: state.journals.map((journal) =>
        journal.id === id
        ? ({ ...journal, connected_entities: data[0].connected_entities})
        : journal
      )}));

      return data;
  },

    removeJournalConnection: async (id: number, connected_entity: any) => {
    const user = supabase.auth.user();
    const journals = useJournalStore.getState().journals;
    let connectedJournal = journals.find((el) => el.id === id);
    connectedJournal.connected_entities = connectedJournal.connected_entities.filter(entity => entity !== connected_entity);
    set((state) => ({
      journals: state.journals.map((journal) =>
      journal.id === id
      ? ({ ...journal, connected_entities: connectedJournal.connected_entities})
      : journal
    )}));

    await supabase
    .from('journals')
    .update({
       connected_entities: connectedJournal.connected_entities
    })
    .eq('id', id)
    .eq('user_id', user?.id);
    }

  }), {name: 'journals', getStorage: () => sessionStorage})
);