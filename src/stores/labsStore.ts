import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useLabsStore = create<any>((set) => ({
  labs: [],
  getLabs: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('labs')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ labs: data });
          return data;
        }
      });
    return data;
  },
  addLab: async (userId: string, title: string, link: string, selectedProject: number) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('labs').insert([
      {
        link,
        title,
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
  editLab: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('labs')
      .update({
        title,
        link,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const lab = draft.labs.find((el) => el.id === data[0].id);
        (lab.title = data[0].title), (lab.link = data[0].link);
      }),
    );
  },
}));
