import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';
import { persist } from "zustand/middleware";

export const useLabsStore = create(
  persist((set) => ({
  labs: [],
  getLabs: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const lab = JSON.parse(sessionStorage.getItem('labs'));
    await supabase
      .from('labs')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          if (lab) {
            if (lab.state.labs.length != data.length) {
              set({ labs: data });
              sessionStorage.removeItem('labs');
            }
          }
        }
      });
    return lab;
  },
  addLab: async (
    userId: string,
    title: string,
    link: string,
    products: string,
    patents: string,
    equipment: string,
    instruments: string,
    email: string,
    phone_number: string,
    manager: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('labs').insert([
      {
        link,
        title,
        products,
        patents,
        equipment,
        instruments,
        email,
        phone_number,
        manager,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.labs.push(data[0]);
      }),
    );
  },
  deleteLab: async (id: number) => {
    const { error } = await supabase.from('labs').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.labs.findIndex((el) => el.id === id);
        draft.labs.splice(index, 1);
      }),
    );
  },
  editLab: async (
    id: number,
    title: string,
    link: string,
    products: string,
    patents: string,
    equipment: string,
    instruments: string,
    email: string,
    phone_number: string,
    manager: string,
  ) => {
    const { data, error } = await supabase
      .from('labs')
      .update({
        title,
        link,
        products,
        patents,
        equipment,
        instruments,
        email,
        phone_number,
        manager,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const lab = draft.labs.find((el) => el.id === data[0].id);
        lab.title = data[0].title;
        lab.link = data[0].link;
        lab.products = data[0].products;
        lab.patents = data[0].patents;
        lab.equipment = data[0].equipment;
        lab.instruments = data[0].instruments;
        lab.email = data[0].email;
        lab.phone_number = data[0].phone_number;
        lab.manager = data[0].manager;
      }),
    );
  },
}), {name: 'labs', getStorage: () => sessionStorage}));

