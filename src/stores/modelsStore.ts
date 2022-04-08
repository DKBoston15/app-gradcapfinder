import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useModelsStore = create<any>((set) => ({
  models: [],
  getModels: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('models')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ models: data });
          return data;
        }
      });
    return data;
  },
  addModel: async (userId: string, title: string, link: string, selectedProject: number) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('models').insert([
      {
        link,
        title,
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
  editModel: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('models')
      .update({
        title,
        link,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const model = draft.models.find((el) => el.id === data[0].id);
        (model.title = data[0].title), (model.link = data[0].link);
      }),
    );
  },
}));
