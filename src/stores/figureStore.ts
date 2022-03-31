import create from 'zustand';
import { supabase } from '../supabase/index';

export const useFigureStore = create<any>((set) => ({
  figures: [],
  getFigures: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('figures')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ figures: data });
          return data;
        }
      });
    return data;
  },
  addFigure: async (userId: string, title: string, link: string, selectedProject: number) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('figures').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getFigures = useFigureStore.getState().getFigures;
    if (selectedProject) {
      getFigures(selectedProject);
    }
  },
  deleteFigure: async (id: number) => {
    const { error } = await supabase.from('figures').delete().eq('id', id);
  },
  editFigure: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('figures')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
}));
