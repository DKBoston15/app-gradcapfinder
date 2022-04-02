import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const usePeopleStore = create<any>((set) => ({
  people: [],
  authors: [],
  connectedPeople: [],
  getPeople: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('people')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('first_name', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ people: data });
          return data;
        }
      });
    return data;
  },
  getAuthors: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('people')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .eq('role', 'Author')
      .order('first_name', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ authors: data });
          return data;
        }
      });
    return data;
  },
  getConnectedPeople: async (selectedProject: any, connected_entity: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('people')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .contains('connected_entities', [connected_entity])
      .order('first_name', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ connectedPeople: data });
          return data;
        }
      });
    return data;
  },
  addPerson: async (
    userId: string,
    first_name: string,
    last_name: string,
    role: string,
    primary: boolean,
    link: string,
    connected_entity: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('people').insert([
      {
        first_name,
        last_name,
        role,
        link,
        user_id: userId,
        project_id: selectedProject,
        primary,
        connected_entities: [connected_entity],
      },
    ]);
    set(
      produce((draft) => {
        draft.people.push(data[0]);
      }),
    );
  },
  deletePeople: async (id: number) => {
    const { error } = await supabase.from('people').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.people.findIndex((el) => el.id === id);
        draft.people.splice(index, 1);
      }),
    );
  },
  editPeople: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('people')
      .update({
        title,
        link,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const person = draft.people.find((el) => el.id === data[0].id);
        (person.title = data[0].title), (person.link = data[0].link);
      }),
    );
  },
  addPeopleConnection: async (id: number, connected_entity: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('people')
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
          const newPeople = await supabase
            .from('people')
            .update({
              connected_entities: newConnectedEntities,
            })
            .eq('id', id)
            .then(async ({ data, error }) => {
              return data;
            });
          return newPeople;
        }
      });
    set(
      produce((draft) => {
        draft.connectedPeople.push(data[0]);
      }),
    );
    return data;
  },
  removePeopleConnection: async (id: number, connected_entity: any) => {
    const user = supabase.auth.user();
    const { newConnectedEntities } = await supabase
      .from('people')
      .select('connected_entities')
      .eq('user_id', user?.id)
      .eq('id', id)
      .then(async ({ data, error }) => {
        if (!error) {
          const newConnectedEntities = data[0].connected_entities.filter(
            (e: any) => e !== connected_entity,
          );
          await supabase
            .from('people')
            .update({
              connected_entities: newConnectedEntities,
            })
            .eq('id', id);

          return { newConnectedEntities };
        }
      });
    set(
      produce((draft) => {
        const connectedPerson = draft.connectedPeople.find((el) => el.id === id);
        connectedPerson.connected_entities = newConnectedEntities;
      }),
    );
  },
}));
