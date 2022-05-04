import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useSamplingStore = create<any>((set) => ({
  samplings: [],
  getSamplings: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('samplings')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ samplings: data });
          return data;
        }
      });
    return data;
  },
  addSampling: async (
    userId: string,
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
    const { data, error } = await supabase.from('samplings').insert([
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
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.samplings.push(data[0]);
      }),
    );
  },
  deleteSampling: async (id: number) => {
    const { error } = await supabase.from('samplings').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.samplings.findIndex((el) => el.id === id);
        draft.samplings.splice(index, 1);
      }),
    );
  },
  editSampling: async (
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
    const { data, error } = await supabase
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

    set(
      produce((draft) => {
        const sampling = draft.samplings.find((el) => el.id === data[0].id);
        sampling.title = data[0].title;
        sampling.link = data[0].link;
        sampling.sampling_design = data[0].sampling_design;
        sampling.sampling_technique = data[0].sampling_technique;
        sampling.sample_size = data[0].sample_size;
        sampling.final_sample = data[0].final_sample;
        sampling.power_analysis = data[0].power_analysis;
        sampling.start_date = data[0].start_date;
        sampling.end_date = data[0].end_date;
      }),
    );
  },
}));
