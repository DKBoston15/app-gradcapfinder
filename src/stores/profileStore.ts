import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useProfileStore = create(
  persist((set) => ({

    profile: {},

    getProfile: async () => {
    const user = supabase.auth.user();
    const profile = JSON.parse(sessionStorage.getItem('profile'));
    await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .then(({ data, error }) => {
      if (!error) {
        if (profile) {
          if (profile.state.profile.length != data.length) {
            sessionStorage.removeItem('profile');
            set({ profile: data[0] });
          }
        } else {
          set({ profile: data[0] });
        }
      }
    });

},

  patchProfile: async (
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
    looking_for_positions?: boolean,
    academic_status?: string,
  ) => {
    const user = supabase.auth.user();
    await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
      field_of_study: fieldOfStudy,
      avatar_url,
      phone_number,
      onboarding_complete,
      university: selectedUniversity,
      graduate_status,
      academic_status,
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
    })
    .eq('id', user.id)
    .then(({ data, error }) => {
      if (!error) {
        set((state) => ({
          profile: { ...state.profile, 
            first_name: firstName,
            last_name: lastName,
            field_of_study: fieldOfStudy,
            avatar_url,
            phone_number,
            onboarding_complete,
            university: selectedUniversity,
            graduate_status,
            academic_status,
            cv_url,
            looking_at_graduate_school,
            in_graduate_school,
            in_coursework,
            conducting_research,
            attending_conferences,
            writing_proposal,
            writing_dissertation,
            looking_for_positions,
          updated_at: data[0].updated_at
      }}))
      }
    });
   
  },

    getProfileImageUrl: async (avatar_url: string) => {
    const { signedURL } = await supabase.storage
      .from('avatars')
      .createSignedUrl(avatar_url, 60);
     return signedURL;
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
    set((state) => ({
      profile: { ...state.profile, avatar_url}
    }))

    let { error } = await supabase
      .from('profiles')
      .update({
        avatar_url,
        updated_at: new Date(),
      })
      .eq('id', id);
  },

    

  }), {name: 'profile', getStorage: () => sessionStorage})
);