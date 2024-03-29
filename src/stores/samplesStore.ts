import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useSamplesStore = create(
  persist(
    (set) => ({
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

      addSample: async (newSampleObj, selectedProject) => {
        const user = supabase.auth.user();
        const { data } = await supabase.from('samplings').insert([
          {
            link: newSampleObj.link,
            title: newSampleObj.title,
            sampling_design: newSampleObj.sampling_design,
            sampling_technique: newSampleObj.sampling_technique,
            sample_size: newSampleObj.sample_size,
            final_sample: newSampleObj.final_sample,
            power_analysis: newSampleObj.power_analysis,
            start_date: newSampleObj.start_date,
            end_date: newSampleObj.end_date,
            user_id: user.id,
            project_id: selectedProject,
          },
        ]);
        set((state) => ({
          samples: [
            ...state.samples,
            {
              id: data[0].id,
              project_id: selectedProject,
              link: newSampleObj.link,
              title: newSampleObj.title,
              sampling_design: newSampleObj.sampling_design,
              sampling_technique: newSampleObj.sampling_technique,
              final_sample: newSampleObj.final_sample,
              power_analysis: newSampleObj.power_analysis,
              start_date: newSampleObj.start_date,
              end_date: newSampleObj.end_date,
            },
          ],
        }));
      },

      deleteSample: async (id) => {
        await supabase.from('samplings').delete().eq('id', id);
        set((state) => ({
          samples: state.samples.filter((sample) => sample.id !== id),
        }));
      },

      patchSample: async (id: number, patchedSampleObj) => {
        await supabase
          .from('samplings')
          .update({
            title: patchedSampleObj.title,
            link: patchedSampleObj.link,
            sampling_design: patchedSampleObj.sampling_design,
            sampling_technique: patchedSampleObj.sampling_technique,
            sample_size: patchedSampleObj.sample_size,
            final_sample: patchedSampleObj.final_sample,
            power_analysis: patchedSampleObj.power_analysis,
            start_date: patchedSampleObj.start_date,
            end_date: patchedSampleObj.end_date,
            project_id: patchedSampleObj.project_id,
          })
          .eq('id', id);
        set((state) => ({
          samples: state.samples.map((sample) =>
            sample.id === id
              ? {
                  ...sample,
                  title: patchedSampleObj.title,
                  link: patchedSampleObj.link,
                  sampling_design: patchedSampleObj.sampling_design,
                  sampling_technique: patchedSampleObj.sampling_technique,
                  sample_size: patchedSampleObj.sample_size,
                  final_sample: patchedSampleObj.final_sample,
                  power_analysis: patchedSampleObj.power_analysis,
                  start_date: patchedSampleObj.start_date,
                  end_date: patchedSampleObj.end_date,
                  project_id: patchedSampleObj.project_id,
                }
              : sample,
          ),
        }));
      },
    }),
    { name: 'samples', getStorage: () => sessionStorage },
  ),
);
