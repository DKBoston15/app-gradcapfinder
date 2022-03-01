import create from "zustand";
import { supabaseClient } from "../lib/client";

export const useConferenceStore = create<any>((set) => ({
  conferences: [],
  getConferences: async () => {
    const user = supabaseClient.auth.user();
    supabaseClient
      .from("conferences")
      .select("*")
      .eq("user_id", user?.id)
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        console.log(error);
        if (!error) {
          // @ts-ignore
          set({ conferences: data });
        }
      });
  },
  addConference: async (title: string) => {
    const user = supabaseClient.auth.user();
    const { error } = await supabaseClient
      .from("conferences")
      .insert([{ title, user_id: user?.id }]);
    const getConferences = useConferenceStore.getState().getConferences;
    getConferences();
  },
  deleteConference: async (id: number) => {
    const { error } = await supabaseClient
      .from("conferences")
      .delete()
      .eq("id", id);
  },
  editConference: async (
    id: number,
    title: string,
    link: string,
    association: string,
    association_link: string,
    fall_start_date: Date,
    fall_end_date: Date,
    spring_start_date: Date,
    spring_end_date: Date,
    summer_start_date: Date,
    summer_end_date: Date,
    winter_start_date: Date,
    winter_end_date: Date,
    submission_deadline: Date,
    registration_deadline: Date
  ) => {
    const { data, error } = await supabaseClient
      .from("conferences")
      .update({
        title,
        link,
        association,
        association_link,
        fall_start_date,
        fall_end_date,
        spring_start_date,
        spring_end_date,
        summer_start_date,
        summer_end_date,
        winter_start_date,
        winter_end_date,
        submission_deadline,
        registration_deadline,
      })
      .eq("id", id);
  },
}));
