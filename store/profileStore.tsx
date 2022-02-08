import create from "zustand";
import { supabaseClient } from "../lib/client";

const realtimeProfileUpdates = supabaseClient
  .from("profiles")
  .on("*", (payload) => {
    const getProfiles = useProfileStore.getState().getProfiles;
    const getProfile = useProfileStore.getState().getProfile;
    getProfiles();
    const user = supabaseClient.auth.user();
    getProfile(user?.id);
  })
  .subscribe();

export const useProfileStore = create<any>((set) => ({
  profiles: [],
  profile: {},
  getProfiles: async () => {
    const { data, error, status } = await supabaseClient
      .from("profiles")
      .select(`first_name, last_name, field_of_study, avatar_url`);
    set({ profiles: data });
  },
  getProfile: async (id: string) => {
    const { data, error, status } = await supabaseClient
      .from("profiles")
      .select(`first_name, last_name, field_of_study, avatar_url`)
      .eq("id", id)
      .single();
    set({ profile: data });
  },
  getChatProfile: async (id: string) => {
    const { data, error, status } = await supabaseClient
      .from("profiles")
      .select(`first_name, last_name, field_of_study, avatar_url`)
      .eq("id", id)
      .single();
    return data;
  },
  getProfileImageUrl: async (avatar_url: string) => {
    const { signedURL, error } = await supabaseClient.storage
      .from("avatars")
      .createSignedUrl(avatar_url, 60);
    return signedURL;
  },
  updateProfile: async (
    id: string,
    firstName?: string,
    lastName?: string,
    fieldOfStudy?: string,
    avatar_url?: string
  ) => {
    let updates = {
      id,
      first_name: firstName,
      last_name: lastName,
      field_of_study: fieldOfStudy,
      avatar_url,
      updated_at: new Date(),
    };

    console.log("updates", updates);

    Object.keys(updates).forEach((key) => {
      //@ts-ignore
      if (updates[key] === null) {
        //@ts-ignore
        delete updates[key];
      }
    });

    console.log(updates);

    let { error } = await supabaseClient.from("profiles").upsert(updates, {
      returning: "minimal",
    });
  },
}));
