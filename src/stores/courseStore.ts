import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useCourseStore = create(
  persist(
    (set) => ({
      courses: [],

      getCourses: async () => {
        const user = supabase.auth.user();
        const courses = JSON.parse(sessionStorage.getItem('courses'));
        await supabase
          .from('courses')
          .select('*')
          .eq('user_id', user?.id)
          .order('title', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (courses) {
                if (courses.state.courses.length != data.length) {
                  sessionStorage.removeItem('courses');
                  set({ courses: data });
                }
              } else {
                set({ courses: data });
              }
            }
          });
      },
      getCourseByTitle: async (title: string) => {
        const user = supabase.auth.user();
        const results = await supabase
          .from('courses')
          .select('*')
          .eq('user_id', user?.id)
          .eq('title', title)
          .then(({ data, error }) => {
            if (!error) {
              return data;
            }
          });
        return results;
      },

      addCourse: async (title: string, completed: boolean, quiz_results: any) => {
        const user = supabase.auth.user();
        const { data } = await supabase.from('courses').insert([
          {
            title,
            completed,
            quiz_results: quiz_results,
            user_id: user.id,
          },
        ]);
        set((state) => ({
          courses: [...state.courses, { id: data[0].id, title, completed, quiz_results }],
        }));
      },

      updateCourse: async (id: number, title: string, completed: boolean, quiz_results: any) => {
        await supabase
          .from('courses')
          .update({
            title,
            completed,
            quiz_results,
          })
          .eq('id', id);
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === id ? { ...course, title, completed, quiz_results } : course,
          ),
        }));
      },
    }),
    { name: 'courses', getStorage: () => sessionStorage },
  ),
);
