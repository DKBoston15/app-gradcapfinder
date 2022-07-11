import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useSamplesStore = create(
  persist((set) => ({

    samples: [],
    filteredSamples: [],

    getFilteredSamples: async (id) => {
      const samples = useSamplesStore.getState().samples;
      const newSamples = samples.filter((sample) => sample.project_id == parseInt(id));
      set({ filteredSamples: newSamples });
    },

    getSamples: async () => {
    const user = supabase.auth.user();
    const samples = JSON.parse(sessionStorage.getItem('samples'));
    await supabase
    .from('samplings')
    .select('*')
    .eq('user_id', user?.id)
    .order('title', { ascending: true })
    .then(({ data, error }) => {
      if (!error) {
        if (samples) {
          if (samples.state.samples.length != data.length) {
            sessionStorage.removeItem('samples');
            set({ samples: data });
          }
        } else {
          set({ samples: data });
        }
      }
    });

},

addSample: async (    
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
    samples: [...state.samples, { id: data[0].id, project_id: selectedProject, link, title, sampling_design, sampling_technique, final_sample, power_analysis, start_date, end_date,  }]
  }))},

  deleteSample: async (id) => {
      await supabase.from('samplings').delete().eq('id', id);
      set((state) => ({
        samples: state.samples.filter((sample) => sample.id !== id)
      }))},

  patchSample: async (
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
      samples: state.samples.map((sample) =>
      sample.id === id
      ? ({ ...sample, title, link, sampling_design, sampling_technique, sample_size, final_sample, power_analysis, start_date, end_date})
      : sample
    ),
    }))},

  }), {name: 'samples', getStorage: () => sessionStorage})
);