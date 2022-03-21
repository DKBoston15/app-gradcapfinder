import create from "zustand";
import { supabase } from "../supabase";

export const useProfileStore = create<any>((set) => ({
  profiles: [],
  profile: {},
  getProfiles: async () => {
    const { data, error, status } = await supabase.from("profiles").select(`*`);
    set({ profiles: data });
  },
  getProfile: async (id: string) => {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("id", id)
      .single();
    set({ profile: data });
  },
  getChatProfile: async (id: string) => {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(`first_name, last_name, field_of_study, avatar_url`)
      .eq("id", id)
      .single();
    return data;
  },
  getProfileImageUrl: async (avatar_url: string) => {
    const { signedURL, error } = await supabase.storage
      .from("avatars")
      .createSignedUrl(avatar_url, 60);
    return signedURL;
  },
  updateProfile: async (
    id: string,
    firstName?: string,
    lastName?: string,
    fieldOfStudy?: string,
    avatar_url?: string,
    phone_number?: string,
    onboarding_complete?: boolean,
    selectedUniversity?: number,
    graduate_status?: string,
    cv_url?: string,
    looking_at_graduate_school?: boolean,
    in_graduate_school?: boolean,
    in_coursework?: boolean,
    conducting_research?: boolean,
    attending_conferences?: boolean,
    writing_proposal?: boolean,
    writing_dissertation?: boolean,
    looking_for_positions?: boolean
  ) => {
    let updates = {
      id,
      first_name: firstName,
      last_name: lastName,
      field_of_study: fieldOfStudy,
      avatar_url,
      phone_number,
      onboarding_complete,
      university: selectedUniversity,
      graduate_status,
      cv_url,
      looking_at_graduate_school,
      in_graduate_school,
      in_coursework,
      conducting_research,
      attending_conferences,
      writing_proposal,
      writing_dissertation,
      looking_for_positions,
      updated_at: new Date(),
    };
    Object.keys(updates).forEach((key) => {
      //@ts-ignore
      if (updates[key] === null || updates[key] === undefined) {
        //@ts-ignore
        delete updates[key];
      }
    });

    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal",
    });
  },
  updateAvatar: async (id: string, avatar_url?: string) => {
    let updates = {
      id,
      avatar_url,
      updated_at: new Date(),
    };
    Object.keys(updates).forEach((key) => {
      //@ts-ignore
      if (updates[key] === null || updates[key] === undefined) {
        //@ts-ignore
        delete updates[key];
      }
    });
    console.log(avatar_url);
    let { error } = await supabase
      .from("profiles")
      .update({
        avatar_url,
        updated_at: new Date(),
      })
      .eq("id", id);
  },
  setSms: async (id: any, sms: boolean) => {
    let { error } = await supabase.from("profiles").upsert(
      { id, sms },
      {
        returning: "minimal",
      }
    );
  },
  setPhoneNumber: async (id: any, phone_number: string) => {
    let { error } = await supabase.from("profiles").upsert(
      { id, phone_number },
      {
        returning: "minimal",
      }
    );
  },
  setSoundEffects: async (id: any, sound_effects: boolean) => {
    let { error } = await supabase.from("profiles").upsert(
      { id, sound_effects },
      {
        returning: "minimal",
      }
    );
  },
  setDarkMode: async (id: any, dark_mode: boolean) => {
    console.log(dark_mode);
    let { error } = await supabase.from("profiles").upsert(
      { id, dark_mode },
      {
        returning: "minimal",
      }
    );
  },
}));
