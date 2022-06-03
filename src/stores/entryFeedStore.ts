/* eslint-disable import/prefer-default-export */
import create from 'zustand';
import produce from 'immer';
import { supabase } from '../supabase/index';

export const useEntryFeedStore = create<any>((set) => ({
  entries: [],
  personalEntries: [],
  getEntries: async (connectedId: any) => {
    if (connectedId) {
      const user = supabase.auth.user();
      supabase
        .from('feed_entries')
        .select('*')
        .eq('user_id', user?.id)
        .eq('connected_id', connectedId)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            // @ts-ignore
            set({ entries: data });
          }
        });
    }
  },
  setEntries: (entries: any[]) => {
    set({ entries });
  },
  addEntry: async (category: string, content: string, connectedId: string, date: string, projectId: number, section: string) => {
    const user = supabase.auth.user();
    const { data } = await supabase.from('feed_entries').insert([
      {
        user_id: user?.id,
        category,
        content,
        connected_id: connectedId,
        date,
        project_id: projectId,
        section,
      },
    ]);

    set(
      produce((draft) => {
        draft.entries.unshift(data[0]);
      }),
    );
  },

  deleteEntry: async (id: number) => {
    await supabase.from('feed_entries').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.entries.findIndex((el) => el.id === id);
        draft.entries.splice(index, 1);
      }),
    );
  },
  editEntry: async (id: number, content: string, date?: string) => {
    const { data } = await supabase
      .from('feed_entries')
      .update({
        content,
        date,
      })
      .eq('id', id);
    set(
      produce((draft) => {
        const feedEntries = draft.entries.find((el) => el.id === data[0].id);
        feedEntries.content = data[0].content; 
        feedEntries.date = data[0].date;
      }),
    );
  },
  completeEntry: async (id: number) => {
    const { data } = await supabase
      .from('feed_entries')
      .update({
        completed_date: new Date(),
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const index = draft.entries.findIndex((el) => el.id === data[0].id);
        draft.entries.splice(index, 1);
      }),
    );
  },
  getTasks: async () => {
    const user = supabase.auth.user();
    const data = supabase
      .from('feed_entries')
      .select('*')
      .eq('user_id', user?.id)
      .eq('category', 'task')
      .then(({ data, error }) => data);
    return data;
  },
  getUpcomingTasksForProject: async (id: number) => {
    const user = supabase.auth.user();
    const data = supabase
      .from('feed_entries')
      .select('*')
      .eq('user_id', user?.id)
      .eq('category', 'task')
      .eq('project_id', id)
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          let filteredData = data.filter((task: any) => task.completed_date == null);
          filteredData = filteredData.sort((a: any, b: any) => (b.date > a.date ? -1 : 1));
          filteredData.length = 4;
          return filteredData;
        }
      });
    return data;
  },
}));
