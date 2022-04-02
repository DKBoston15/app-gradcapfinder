import { connect } from 'http2';
import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useEntryFeedStore = create<any>((set) => ({
  entries: [],
  getEntries: async (connected_id: any) => {
    if (connected_id) {
      const user = supabase.auth.user();
      supabase
        .from('feed_entries')
        .select('*')
        .eq('user_id', user?.id)
        .eq('connected_id', connected_id)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            // @ts-ignore
            set({ entries: data });
          }
        });
    }
  },
  addEntry: async (category: string, content: string, connected_id: string, date: string) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('feed_entries').insert([
      {
        user_id: user?.id,
        category,
        content,
        connected_id,
        date,
      },
    ]);
    set(
      produce((draft) => {
        draft.entries.push(data[0]);
      }),
    );
  },
  deleteEntry: async (id: number) => {
    const { error } = await supabase.from('feed_entries').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.entries.findIndex((el) => el.id === id);
        draft.entries.splice(index, 1);
      }),
    );
  },
  editEntry: async (id: number, content: string, date?: string) => {
    const { data, error } = await supabase
      .from('feed_entries')
      .update({
        content,
        date,
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const feed_entries = draft.entries.find((el) => el.id === data[0].id);
        (feed_entries.content = data[0].content), (feed_entries.date = data[0].date);
      }),
    );
  },
  completeEntry: async (id: number) => {
    const { data, error } = await supabase
      .from('feed_entries')
      .update({
        completed_date: new Date(),
      })
      .eq('id', id);

    set(
      produce((draft) => {
        const feed_entries = draft.entries.find((el) => el.id === data[0].id);
        feed_entries.completed_date = data[0].completed_date;
      }),
    );
  },
}));
