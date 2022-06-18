import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';
import { persist } from "zustand/middleware";

export const useModelsStore = create(
  persist((set) => ({
  models: [],
  getModels: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const models = JSON.parse(sessionStorage.getItem('models'));
    await supabase
      .from('models')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (models) {
          if (models.state.models.length != data.length) {
            set({ models: data });
            sessionStorage.removeItem('models');
          }
        }
      });
    return models;
  },
  addModel: async (
    userId: string,
    title: string,
    link: string,
    type: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('models').insert([
      {
        link,
        title,
        type,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.models.push(data[0]);
      }),
    );
  },
  deleteModel: async (id: number) => {
    const { error } = await supabase.from('models').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.models.findIndex((el) => el.id === id);
        draft.models.splice(index, 1);
      }),
    );
  },
  editModel: async (id: number, title: string, link: string, type: string) => {
    const { data, error } = await supabase
      .from('models')
      .update({
        title,
        link,
        type,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const model = draft.models.find((el) => el.id === data[0].id);
        model.title = data[0].title;
        model.link = data[0].link;
        model.type = data[0].type;
      }),
    );
  },
}), {name: 'models', getStorage: () => sessionStorage}));
