import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useResearchQuestionsStore = create(
  persist(
    (set) => ({
      research_questions: [],
      filteredResearchQuestions: [],

      getFilteredResearchQuestions: async (id) => {
        const research_questions = useResearchQuestionsStore.getState().research_questions;
        const newResearchQuestions = research_questions.filter(
          (research_question) => research_question.project_id == parseInt(id),
        );
        set({ filteredResearchQuestions: newResearchQuestions });
      },

      getResearchQuestions: async () => {
        const user = supabase.auth.user();
        const research_questions = JSON.parse(sessionStorage.getItem('researchQuestions'));
        await supabase
          .from('research_questions')
          .select('*')
          .eq('user_id', user?.id)
          .order('title', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (research_questions) {
                if (research_questions.state.research_questions.length != data.length) {
                  sessionStorage.removeItem('researchQuestions');
                  set({ research_questions: data });
                }
              } else {
                set({ research_questions: data });
              }
            }
          });
      },

      addResearchQuestion: async (title: string, link: string, selectedProject: number) => {
        const user = supabase.auth.user();
        const { data } = await supabase.from('research_questions').insert([
          {
            link,
            title,
            user_id: user.id,
            project_id: selectedProject,
          },
        ]);
        set((state) => ({
          research_questions: [
            ...state.research_questions,
            { id: data[0].id, link, title, project_id: selectedProject },
          ],
        }));
      },

      deleteResearchQuestion: async (id) => {
        await supabase.from('research_questions').delete().eq('id', id);
        set((state) => ({
          research_questions: state.research_questions.filter(
            (research_question) => research_question.id !== id,
          ),
        }));
      },

      patchResearchQuestion: async (
        id: number,
        title: string,
        link: string,
        question_1: string,
        question_2: string,
        question_3: string,
        question_4: string,
        question_5: string,
        question_6: string,
        question_7: string,
        project_id: any,
      ) => {
        await supabase
          .from('research_questions')
          .update({
            title,
            link,
            question_1,
            question_2,
            question_3,
            question_4,
            question_5,
            question_6,
            question_7,
            project_id,
          })
          .eq('id', id);
        set((state) => ({
          research_questions: state.research_questions.map((research_question) =>
            research_question.id === id
              ? {
                  ...research_question,
                  title,
                  link,
                  question_1,
                  question_2,
                  question_3,
                  question_4,
                  question_5,
                  question_6,
                  question_7,
                  project_id,
                }
              : research_question,
          ),
        }));
      },
    }),
    { name: 'researchQuestions', getStorage: () => sessionStorage },
  ),
);
