import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';
import { connected } from 'process';

export const usePeopleStore = create<any>((set) => ({
  people: [],
  connectedAuthors: [],
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
  getConnectedAuthors: async (selectedProject: any, connected_entity: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('people')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .eq('role', 'Author')
      .contains('connected_entities', [connected_entity])
      .order('primary', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ connectedAuthors: data });
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
      .order('primary', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ connectedAuthors: data });
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
      .not('role', 'eq', 'Author')
      .contains('connected_entities', [connected_entity])
      .order('primary', { ascending: true })
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
    email: string,
    phone: string,
    linkedin: string,
    website: string,
    cv_link: string,
    university: string,
    professorial_status: string,
    key_article: string,
    project_role: string,
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
        email,
        phone,
        linkedin,
        website,
        cv_link,
        university,
        professorial_status,
        key_article,
        project_role,
        user_id: userId,
        project_id: selectedProject,
        primary,
        connected_entities: connected_entity ? [connected_entity] : [],
      },
    ]);
    set(
      produce((draft) => {
        draft.people.push(data[0]);
      }),
    );
  },
  addConnectedPerson: async (
    userId: string,
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
    key_article: string,
    project_role: string,
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
        email,
        phone,
        linkedin,
        website,
        cv_link,
        university,
        professorial_status,
        key_article,
        project_role,
        user_id: userId,
        project_id: selectedProject,
        primary,
        connected_entities: [connected_entity],
      },
    ]);
    set(
      produce((draft) => {
        if (data[0].role === 'Author') {
          draft.connectedAuthors.push(data[0]);
        } else {
          draft.connectedPeople.push(data[0]);
        }
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
  editPerson: async (
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
    key_article: string,
    project_role: string,
  ) => {
    const { data, error } = await supabase
      .from('people')
      .update({
        id,
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
        key_article,
        project_role,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const person = draft.people.find((el) => el.id === data[0].id);
        person.first_name = data[0].first_name;
        person.last_name = data[0].last_name;
        person.email = data[0].email;
        person.phone = data[0].phone;
        person.linkedin = data[0].linkedin;
        person.website = data[0].website;
        person.role = data[0].role;
        person.cv_link = data[0].cv_link;
        person.university = data[0].university;
        person.professorial_status = data[0].professorial_status;
        person.key_article = data[0].key_article;
        person.link = data[0].link;
        person.project_role = data[0].project_role;
      }),
    );
  },
  addPeopleConnection: async (id: number, connected_entity: any, role: any) => {
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
        if (role === 'Author') {
          draft.connectedAuthors.push(data[0]);
        } else {
          draft.connectedPeople.push(data[0]);
        }
      }),
    );
    return data;
  },
  removePeopleConnection: async (id: number, connected_entity: any, role: any) => {
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
        if (role === 'Author') {
          const connectedPerson = draft.connectedAuthors.find((el) => el.id === id);
          connectedPerson.connected_entities = newConnectedEntities;
          const index = draft.connectedAuthors.findIndex(
            (author: any) => author.id === connectedPerson.id,
          );
          if (index !== -1) draft.connectedAuthors.splice(index, 1);
        } else {
          const connectedPerson = draft.connectedPeople.find((el) => el.id === id);
          connectedPerson.connected_entities = newConnectedEntities;
          const index = draft.connectedPeople.findIndex(
            (person: any) => person.id === connectedPerson.id,
          );
          if (index !== -1) draft.connectedPeople.splice(index, 1);
        }
      }),
    );
  },
}));
