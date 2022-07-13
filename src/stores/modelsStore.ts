import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useModelsStore = create(
  persist((set) => ({

    models: [],
    filteredModels: [],

    getFilteredModels: async (id) => {
      const models = useModelsStore.getState().models;
      const newModels = models.filter((model) => model.project_id == parseInt(id));
      set({ filteredModels: newModels });
    },

    getModels: async () => {
    const user = supabase.auth.user();
    const models = JSON.parse(sessionStorage.getItem('models'));
    await supabase
    .from('models')
    .select('*')
    .eq('user_id', user?.id)
    .order('title', { ascending: true })
    .then(({ data, error }) => {
      if (!error) {
        if (models) {
          if (models.state.models.length != data.length) {
            sessionStorage.removeItem('models');
            set({ models: data });
          }
        } else {
          set({ models: data });
        }
      }
    });

},

addModel: async (    
  title: string,
  link: string,
  type: string,
  selectedProject: number,
) => {
  const user = supabase.auth.user();
  const { data } = await supabase.from('models').insert([
    {
      link,
      title,
      type,
      user_id: user.id,
      project_id: selectedProject,
    },
  ]);
  set((state) => ({
    models: [...state.models, { id: data[0].id, link, title, type, project_id: selectedProject }]
  }))},

  deleteModel: async (id) => {
      await supabase.from('models').delete().eq('id', id);
      set((state) => ({
        models: state.models.filter((model) => model.id !== id)
      }))},

  patchModel: async (
    id: number, title: string, link: string, type: string
  ) => {
    await supabase
    .from('models')
    .update({
      title,
      link,
      type,
    })
    .eq('id', id);
    set((state) => ({
      models: state.models.map((model) =>
      model.id === id
      ? ({ ...model, title, link, type})
      : model
    ),
    }))},

  }), {name: 'models', getStorage: () => sessionStorage})
);