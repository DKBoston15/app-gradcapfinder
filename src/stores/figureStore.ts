import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';
import { persist } from "zustand/middleware";

export const useFigureStore = create(
  persist((set) => ({
  figures: [],
  getFigures: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const figures = JSON.parse(sessionStorage.getItem('figures'));
    await supabase
      .from('figures')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          if (figures) {
            if (figures.state.figures.length != data.length) {
              set({ figures: data });
              sessionStorage.removeItem('figures');
            }
          }
        }
      });
    return figures;
  },
  addFigure: async (
    userId: string,
    title: string,
    link: string,
    type: string,
    number: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('figures').insert([
      {
        link,
        title,
        type,
        number,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.figures.push(data[0]);
      }),
    );
  },
  deleteFigure: async (id: number) => {
    const { error } = await supabase.from('figures').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.figures.findIndex((el) => el.id === id);
        draft.figures.splice(index, 1);
      }),
    );
  },
  editFigure: async (id: number, title: string, link: string, type: string, number: string) => {
    const { data, error } = await supabase
      .from('figures')
      .update({
        title,
        link,
        type,
        number,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const figure = draft.figures.find((el) => el.id === data[0].id);
        figure.title = data[0].title;
        figure.link = data[0].link;
        figure.type = data[0].type;
        figure.number = data[0].number;
      }),
    );
  },
}), {name: 'figures', getStorage: () => sessionStorage}));
