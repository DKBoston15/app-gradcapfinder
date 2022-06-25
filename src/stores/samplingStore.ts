import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useSamplingStore = create(
  persist((set) => ({

    samplings: [],

    getSamplings: async () => {
    const user = supabase.auth.user();
    const samplings = JSON.parse(sessionStorage.getItem('samplings'));
    await supabase
    .from('samplings')
    .select('*')
    .eq('user_id', user?.id)
    .order('title', { ascending: true })
    .then(({ data, error }) => {
      if (!error) {
        if (samplings) {
          if (samplings.state.samplings.length != data.length) {
            sessionStorage.removeItem('samplings');
            set({ samplings: data });
          }
        } else {
          set({ samplings: data });
        }
      }
    });

},

addSampling: async (    
  title: string,
  link: string,
  sampling_design: string,
  sampling_technique: string,
  sample_size: number,
  final_sample: number,
  power_analysis: string,
  start_date: string,
  end_date: string,
  selectedProject: number,
) => {
  const user = supabase.auth.user();
  const { data } = await supabase.from('samplings').insert([
    {
      link,
      title,
      sampling_design,
      sampling_technique,
      sample_size,
      final_sample,
      power_analysis,
      start_date,
      end_date,
      user_id: user.id,
      project_id: selectedProject,
    },
  ]);
  set((state) => ({
    samplings: [...state.samplings, { id: data[0].id, project_id: selectedProject, link, title, sampling_design, sampling_technique, final_sample, power_analysis, start_date, end_date,  }]
  }))},

  deleteSampling: async (id) => {
      await supabase.from('samplings').delete().eq('id', id);
      set((state) => ({
        samplings: state.samplings.filter((sampling) => sampling.id !== id)
      }))},

  patchSampling: async (
    id: number,
    title: string,
    link: string,
    sampling_design: string,
    sampling_technique: string,
    sample_size: number,
    final_sample: number,
    power_analysis: string,
    start_date: string,
    end_date: string,
  ) => {
    await supabase
    .from('samplings')
    .update({
      title,
      link,
      sampling_design,
      sampling_technique,
      sample_size,
      final_sample,
      power_analysis,
      start_date,
      end_date,
    })
    .eq('id', id);
    set((state) => ({
      samplings: state.samplings.map((sampling) =>
      sampling.id === id
      ? ({ ...sampling, title, link, sampling_design, sampling_technique, sample_size, final_sample, power_analysis, start_date, end_date})
      : sampling
    ),
    }))},

  }), {name: 'samplings', getStorage: () => sessionStorage})
);