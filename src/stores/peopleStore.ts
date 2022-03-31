import create from 'zustand';
import { supabase } from '../supabase/index';

export const usePeopleStore = create<any>((set) => ({
  people: [],
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
    const { error } = await supabase.from('people').insert([
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
    const getPeople = usePeopleStore.getState().getPeople;
    if (selectedProject) {
      getPeople(selectedProject);
    }
  },
  deletePeople: async (id: number) => {
    const { error } = await supabase.from('people').delete().eq('id', id);
  },
  editPeople: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('people')
      .update({
        title,
        link,
      })
      .eq('id', id);
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
    return data;
  },
  removePeopleConnection: async (id: number, connected_entity: any) => {
    const user = supabase.auth.user();
    const data = await supabase
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
        }
      });
  },
}));
