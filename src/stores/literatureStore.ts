import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useLiteratureStore = create<any>((set) => ({
  literature: [],
  getLiterature: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('literature')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ literature: data });
          return data;
        }
      });
    return data;
  },
  addLiterature: async (
    userId: string,
    research_paradigm: string,
    sampling_design: string,
    sampling_technique: string,
    analytic_design: string[],
    research_design: string,
    authors: string[],
    year: string,
    title: string,
    journal: string,
    volume: string,
    issue: string,
    start_page: string,
    end_page: string,
    link: string,
    selectedProject: number,
  ) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('literature').insert([
      {
        research_paradigm,
        sampling_design,
        sampling_technique,
        analytic_design,
        research_design,
        authors,
        year,
        journal,
        volume,
        issue,
        start_page,
        end_page,
        link,
        title,
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.literature.push(data[0]);
      }),
    );
  },
  deleteLiterature: async (id: number) => {
    const { error } = await supabase.from('literature').delete().eq('id', id);

    set(
      produce((draft) => {
        const index = draft.literature.findIndex((el) => el.id === id);
        draft.literature.splice(index, 1);
      }),
    );
  },
  editLiterature: async (
    id: number,
    research_paradigm: string,
    sampling_design: string,
    sampling_technique: string,
    analytic_design: string[],
    research_design: string,
    authors: string[],
    year: string,
    title: string,
    journal: string,
    volume: string,
    issue: string,
    start_page: string,
    end_page: string,
    link: string,
  ) => {
    const { data, error } = await supabase
      .from('literature')
      .update({
        research_paradigm,
        sampling_design,
        sampling_technique,
        analytic_design,
        research_design,
        authors,
        year,
        title,
        journal,
        volume,
        issue,
        start_page,
        end_page,
        link,
      })
      .eq('id', id);
    set(
      produce((draft) => {
        const literature = draft.literature.find((el) => el.id === data[0].id);
        (literature.research_paradigm = data[0].research_paradigm),
          (literature.sampling_design = data[0].sampling_design),
          (literature.sampling_technique = data[0].sampling_technique),
          (literature.analytic_design = data[0].analytic_design),
          (literature.research_design = data[0].research_design),
          (literature.authors = data[0].authors),
          (literature.year = data[0].year),
          (literature.title = data[0].title),
          (literature.journal = data[0].journal),
          (literature.volume = data[0].volume),
          (literature.issue = data[0].issue),
          (literature.start_page = data[0].start_page),
          (literature.end_page = data[0].end_page),
          (literature.link = data[0].link);
      }),
    );
  },
}));
