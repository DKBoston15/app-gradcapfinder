import create from 'zustand';
import { supabase } from '../supabase/index';

export const useArticleStore = create<any>((set) => ({
  articles: [],
  getArticles: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('articles')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ articles: data });
          return data;
        }
      });
    return data;
  },
  addArticle: async (
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
    const { error } = await supabase.from('articles').insert([
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
    const getArticles = useArticleStore.getState().getArticles;
    if (selectedProject) {
      getArticles(selectedProject);
    }
  },
  deleteArticle: async (id: number) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);
  },
  editArticle: async (
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
      .from('articles')
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
  },
}));
