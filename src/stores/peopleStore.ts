import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const usePeopleStore = create(
  persist(
    (set) => ({
      people: [],
      filteredPeople: [],

      getFilteredPeople: async (id) => {
        const people = usePeopleStore.getState().people;
        const newPeople = people.filter((person) => person.project_id == parseInt(id));
        set({ filteredPeople: newPeople });
      },

      getPeople: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const people = JSON.parse(sessionStorage.getItem('people'));
        await supabase
          .from('people')
          .select('*')
          .eq('user_id', user?.id)
          .order('first_name', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (people) {
                if (people.state.people.length != data.length) {
                  sessionStorage.removeItem('people');
                  set({ people: data });
                }
              } else {
                set({ people: data });
              }
            }
          });
      },

      addPerson: async (
        first_name: string,
        last_name: string,
        role: string,
        primary: boolean,
        link: string,
        email: string,
        phone: string,
        linkedin: string,
        website: string,
        cv_link: string,
        university: string,
        professorial_status: string,
        key_literature: string,
        project_role: string,
        connected_entity: string,
        selectedProject: number,
      ) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data } = await supabase
          .from('people')
          .insert([
            {
              first_name,
              last_name,
              role,
              link,
              email,
              phone,
              linkedin,
              website,
              cv_link,
              university,
              professorial_status,
              key_literature,
              project_role,
              user_id: user.id,
              project_id: selectedProject,
              primary,
              connected_entities: connected_entity ? [connected_entity] : [],
            },
          ])
          .select();
        set((state) => ({
          people: [
            ...state.people,
            {
              id: data[0].id,
              first_name,
              last_name,
              role,
              link,
              email,
              phone,
              linkedin,
              website,
              cv_link,
              university,
              professorial_status,
              key_literature,
              project_role,
              user_id: user.id,
              project_id: selectedProject,
              primary,
              connected_entities: data[0].connected_entities,
            },
          ],
        }));
      },

      deletePerson: async (id) => {
        await supabase.from('people').delete().eq('id', id);
        set((state) => ({
          people: state.people.filter((people) => people.id !== id),
        }));
      },

      patchPerson: async (
        id: string,
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        linkedin: string,
        website: string,
        role: string,
        cv_link: string,
        university: string,
        professorial_status: string,
        link: string,
        key_literature: string,
        project_role: string,
        primary: boolean,
        project_id: any,
      ) => {
        await supabase
          .from('people')
          .update({
            first_name,
            last_name,
            email,
            phone,
            linkedin,
            website,
            role,
            cv_link,
            university,
            professorial_status,
            link,
            key_literature,
            project_role,
            primary,
            project_id,
          })
          .eq('id', id);
        set((state) => ({
          people: state.people.map((people) =>
            people.id === id
              ? {
                  ...people,
                  first_name,
                  last_name,
                  email,
                  phone,
                  linkedin,
                  website,
                  role,
                  cv_link,
                  university,
                  professorial_status,
                  link,
                  key_literature,
                  project_role,
                  primary,
                  project_id,
                }
              : people,
          ),
        }));
      },

      addPeopleConnection: async (id: number, connected_entity: any, role: any) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
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

        set((state) => ({
          people: state.people.map((people) =>
            people.id === id
              ? { ...people, connected_entities: data[0].connected_entities }
              : people,
          ),
        }));
      },

      removePeopleConnection: async (id: number, connected_entity: any, role: any) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const people = usePeopleStore.getState().people;
        let connectedPerson = people.find((el) => el.id === id);
        connectedPerson.connected_entities = connectedPerson.connected_entities.filter(
          (entity) => entity !== connected_entity,
        );

        set((state) => ({
          people: state.people.map((people) =>
            people.id === id
              ? { ...people, connected_entities: connectedPerson.connected_entities }
              : people,
          ),
        }));

        await supabase
          .from('people')
          .update({
            connected_entities: connectedPerson.connected_entities,
          })
          .eq('id', id)
          .eq('user_id', user?.id);
      },
    }),
    { name: 'people', getStorage: () => sessionStorage },
  ),
);
