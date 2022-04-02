import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

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
    const { data, error } = await supabase.from('research_questions').insert([
      {
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.research_questions.push(data[0]);
      }),
    );
  },
  deleteResearchQuestion: async (id: number) => {
    const { error } = await supabase.from('research_questions').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.research_questions.findIndex((el) => el.id === id);
        draft.research_questions.splice(index, 1);
      }),
    );
  },
  editResearchQuestion: async (id: number, title: string, link: string) => {
    const { data, error } = await supabase
      .from('research_questions')
      .update({
        title,
        link,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const research_question = draft.research_questions.find((el) => el.id === data[0].id);
        (research_question.title = data[0].title), (research_question.link = data[0].link);
      }),
    );
  },
}));
