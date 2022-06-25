import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useFigureStore = create(
  persist((set) => ({

    figures: [],

    getFigures: async () => {
    const user = supabase.auth.user();
    const figures = JSON.parse(sessionStorage.getItem('figures'));
    await supabase
    .from('figures')
    .select('*')
    .eq('user_id', user?.id)
    .order('title', { ascending: true })
    .then(({ data, error }) => {
      if (!error) {
        if (figures) {
          if (figures.state.figures.length != data.length) {
            sessionStorage.removeItem('figures');
            set({ figures: data });
          }
        } else {
          set({ figures: data });
        }
      }
    });

},

addFigure: async (    
  title: string,
  link: string,
  type: string,
  number: string,
  selectedProject: number,
) => {
  const user = supabase.auth.user();
  const { data } = await supabase.from('figures').insert([
    {
      link,
      title,
      type,
      number,
      user_id: user.id,
      project_id: selectedProject,
    },
  ]);
  set((state) => ({
    figures: [...state.figures, { id: data[0].id, link, title, type, number, project_id: selectedProject }]
  }))},

  deleteFigure: async (id) => {
      await supabase.from('figures').delete().eq('id', id);
      set((state) => ({
        figures: state.figures.filter((figure) => figure.id !== id)
      }))},

  patchFigure: async (
    id: number, title: string, link: string, type: string, number: string
  ) => {
    await supabase
    .from('figures')
    .update({
      title,
      link,
      type,
      number,
    })
    .eq('id', id);
    set((state) => ({
      figures: state.figures.map((figure) =>
      figure.id === id
      ? ({ ...figure, title, link, type, number})
      : figure
    ),
    }))},

  }), {name: 'figures', getStorage: () => sessionStorage})
);