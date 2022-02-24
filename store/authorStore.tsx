import create from "zustand";
import { supabaseClient } from "../lib/client";

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
  editSubAuthor: async (
    id: number,
    title: string,
    link: string,
    cv_link: string,
    university: string,
    professorial_status: string,
    key_article: string
  ) => {
    const { data, error } = await supabaseClient
      .from("subauthors")
      .update({
        title,
        link,
        cv_link,
        university,
        professorial_status,
        key_article,
      })
      .eq("id", id);
  },
  editAuthor: async (
    id: number,
    title: string,
    link: string,
    cv_link: string,
    university: string,
    professorial_status: string,
    key_article: string
  ) => {
    const { data, error } = await supabaseClient
      .from("authors")
      .update({
        title,
        link,
        cv_link,
        university,
        professorial_status,
        key_article,
      })
      .eq("id", id);
  },
  updateAuthorTags: async (id: string, tags: any[]) => {
    const { data, error } = await supabaseClient
      .from("authors")
      .update({
        key_terms: tags,
      })
      .eq("id", id);
  },
  updateSubAuthorTags: async (id: string, tags: any[]) => {
    const { data, error } = await supabaseClient
      .from("subauthors")
      .update({
        key_terms: tags,
      })
      .eq("id", id);
  },
}));
