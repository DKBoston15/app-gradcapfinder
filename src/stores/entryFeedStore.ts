import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useEntryFeedStore = create(
  persist(
    (set) => ({
      feed_entries: [],

      getEntries: async () => {
        const user = supabase.auth.user();
        const feed_entries = JSON.parse(sessionStorage.getItem('feedEntries'));
        await supabase
          .from('feed_entries')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
          .then(({ data, error }) => {
            if (!error) {
              if (feed_entries) {
                if (feed_entries.state.feed_entries.length != data.length) {
                  sessionStorage.removeItem('feedEntries');
                  set({ feed_entries: data });
                }
              } else {
                set({ feed_entries: data });
              }
            }
          });
      },

      addEntry: async (category: string, content: string, connectedId: string) => {
        const user = supabase.auth.user();
        const { data } = await supabase.from('feed_entries').insert([
          {
            category,
            content,
            connected_id: connectedId,
            user_id: user.id,
          },
        ]);
        set((state) => ({
          feed_entries: [
            ...state.feed_entries,
            {
              id: data[0].id,
              category,
              content,
              connected_id: connectedId,
              created_at: data[0].created_at,
            },
          ],
        }));
      },

      deleteEntry: async (id) => {
        await supabase.from('feed_entries').delete().eq('id', id);
        set((state) => ({
          feed_entries: state.feed_entries.filter((feed_entry) => feed_entry.id !== id),
        }));
      },

      patchEntry: async (id: number, content: string) => {
        await supabase
          .from('feed_entries')
          .update({
            content,
          })
          .eq('id', id);
        set((state) => ({
          feed_entries: state.feed_entries.map((feed_entry) =>
            feed_entry.id === id ? { ...feed_entry, content } : feed_entry,
          ),
        }));
      },
    }),
    { name: 'feedEntries', getStorage: () => sessionStorage },
  ),
);
