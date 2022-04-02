import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useSamplingStore = create<any>((set) => ({
  samplings: [],
  getSamplings: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('samplings')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ samplings: data });
          return data;
        }
      });
    return data;
  },
  addSampling: async (userId: string, title: string, link: string, selectedProject: number) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('samplings').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.samplings.push(data[0]);
      }),
    );
  },
  deleteSampling: async (id: number) => {
    const { error } = await supabase.from('samplings').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.samplings.findIndex((el) => el.id === id);
        draft.samplings.splice(index, 1);
      }),
    );
  },
  editSampling: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('samplings')
      .update({
        title,
        link,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const sampling = draft.samplings.find((el) => el.id === data[0].id);
        (sampling.title = data[0].title), (sampling.link = data[0].link);
      }),
    );
  },
}));
