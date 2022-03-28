import create from "zustand";
import { supabase } from "../supabase/index";

export const usePeopleStore = create<any>((set) => ({
  people: [],
  getPeople: async () => {
    const user = supabase.auth.user();
    const data = await supabase
      .from("people")
      .select("*")
      .eq("user_id", user?.id)
      .order("first_name", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ people: data });
          return data;
        }
      });
    return data;
  },
  addPerson: async (userId: string) => {
    const user = supabase.auth.user();
    const { error } = await supabase.from("people").insert([
      {
        user_id: userId,
      },
    ]);
    const getPeople = usePeopleStore.getState().getPeople;
    getPeople();
  },
  deletePerson: async (id: number) => {
    const { error } = await supabase.from("people").delete().eq("id", id);
  },
  editPerson: async (id: number) => {
    const { data, error } = await supabase
      .from("people")
      .update({})
      .eq("id", id);
  },
}));
