import create from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabase/index';

const useTaskStore = create(
  persist(
    (set) => ({
      todos: [],
      getTodos: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const tasks = JSON.parse(sessionStorage.getItem('tasks'));
        await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user?.id)
          .order('title', { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              if (tasks) {
                if (tasks.state.todos.length != data.length) {
                  set({ todos: data });
                  sessionStorage.removeItem('tasks');
                }
              }
            }
          });
      },
      getConnectedItem: async (id: any) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const data = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user?.id)
          .eq('connected_id', id)
          .then(({ data, error }) => {
            if (!error) {
              return data;
            }
          });
        return data;
      },
      addTodo: async (
        title,
        priority,
        date,
        project,
        time,
        status,
        content,
        completed_at,
        connected_id,
      ) => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data } = await supabase.from('tasks').insert([
          {
            title,
            priority,
            date,
            project,
            time,
            status,
            content,
            completed_at,
            user_id: user?.id,
            connected_id,
          },
        ]);
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: data[0].id,
              title,
              priority,
              date,
              project,
              time,
              status,
              completed_at,
              user: user?.id,
              connected_id,
            },
          ],
        }));
      },
      removeTodo: async (id) => {
        await supabase.from('tasks').delete().eq('id', id);
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      completeTodo: async (id) => {
        const { data } = await supabase
          .from('tasks')
          .update({
            completed_at: new Date(),
            status: 'Done',
          })
          .eq('id', id);
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed_at: data[0].completed_at, status: 'Done' } : todo,
          ),
        }));
      },
      patchTodo: async (
        id,
        title,
        priority,
        date,
        project,
        time,
        status,
        content,
        connected_id,
      ) => {
        await supabase
          .from('tasks')
          .update({
            title,
            priority,
            date,
            project,
            time,
            status,
            content,
            connected_id,
          })
          .eq('id', id);
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  title: title,
                  priority: priority,
                  date: date,
                  project: project,
                  time: time,
                  status: status,
                  content: content,
                  connected_id: connected_id,
                }
              : todo,
          ),
        }));
      },
      patchContent: async (id, content) => {
        await supabase
          .from('tasks')
          .update({
            content,
          })
          .eq('id', id);
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, content: content } : todo)),
        }));
      },
    }),
    { name: 'tasks', getStorage: () => sessionStorage },
  ),
);

export default useTaskStore;
