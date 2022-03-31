import create from 'zustand';
import { supabase } from '../supabase/index';

export const useResearchQuestionsStore = create<any>((set) => ({
  research_questions: [],
  getResearchQuestions: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('research_questions')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ research_questions: data });
          return data;
        }
      });
    return data;
  },
  addResearchQuestion: async (
    userId: string,
    title: string,
    link: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('research_questions').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    const getResearchQuestions = useResearchQuestionsStore.getState().getResearchQuestions;
    if (selectedProject) {
      getResearchQuestions(selectedProject);
    }
  },
  deleteResearchQuestion: async (id: number) => {
    const { error } = await supabase.from('research_questions').delete().eq('id', id);
  },
  editResearchQuestion: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('research_questions')
      .update({
        title,
        link,
      })
      .eq('id', id);
  },
}));
