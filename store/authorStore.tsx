import create from "zustand";
import { supabaseClient } from "../lib/client";

const realtimeAuthorUpdates = supabaseClient
  .from("authors")
  .on("*", (payload) => {
    const getAuthors = useAuthorStore.getState().getAuthors;
    const getSubauthors = useAuthorStore.getState().getSubauthors;
    getAuthors();
    getSubauthors();
  })
  .subscribe();

const realtimeSubAuthorUpdates = supabaseClient
  .from("subauthors")
  .on("*", (payload) => {
    const getSubauthors = useAuthorStore.getState().getSubauthors;
    getSubauthors();
  })
  .subscribe();

export const useAuthorStore = create<any>((set) => ({
  authors: [],
  subauthors: [],
  getAuthors: async () => {
    const user = supabaseClient.auth.user();
    supabaseClient
      .from("authors")
      .select("*")
      .eq("user_id", user?.id)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ authors: data });
        }
      });
  },
  getSubauthors: async () => {
    const user = supabaseClient.auth.user();
    supabaseClient
      .from("subauthors")
      .select("*")
      .eq("user_id", user?.id)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ subauthors: data });
        }
      });
  },
  addAuthor: async (title: string, link: string) => {
    const user = supabaseClient.auth.user();
    const { error } = await supabaseClient
      .from("authors")
      .insert([{ title, link, user_id: user?.id }]);
  },
  addSubauthor: async (author_id: number, title: string, link: string) => {
    const user = supabaseClient.auth.user();
    const { error } = await supabaseClient
      .from("subauthors")
      .insert([{ author_id, title, link, user_id: user?.id }]);
  },
  deleteAuthor: async (id: number) => {
    supabaseClient
      .from("subauthors")
      .select("*")
      .eq("author_id", id)
      .then(async ({ data, error }) => {
        if (!error) {
          // @ts-ignore
          for (let i = 0; i < data.length; i++) {
            await supabaseClient
              .from("subauthors")
              .delete()
              // @ts-ignore
              .eq("id", data[i].id);
          }
          await supabaseClient.from("authors").delete().eq("id", id);
        }
      });
  },
  deleteSubauthor: async (id: number) => {
    const { error } = await supabaseClient
      .from("subauthors")
      .delete()
      .eq("id", id);
  },
  editSubAuthor: async (id: number, title: string, link: string) => {
    const { data, error } = await supabaseClient
      .from("subauthors")
      .update({ title, link })
      .eq("id", id);
  },
  editAuthor: async (id: number, title: string, link: string) => {
    const { data, error } = await supabaseClient
      .from("authors")
      .update({ title, link })
      .eq("id", id);
  },
}));
