import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

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
    const { data, error } = await supabase.from('articles').insert([
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
        draft.articles.push(data[0]);
      }),
    );
  },
  deleteArticle: async (id: number) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);

    set(
      produce((draft) => {
        const index = draft.articles.findIndex((el) => el.id === id);
        draft.articles.splice(index, 1);
      }),
    );
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
    set(
      produce((draft) => {
        const article = draft.articles.find((el) => el.id === data[0].id);
        (article.research_paradigm = data[0].research_paradigm),
          (article.sampling_design = data[0].sampling_design),
          (article.sampling_technique = data[0].sampling_technique),
          (article.analytic_design = data[0].analytic_design),
          (article.research_design = data[0].research_design),
          (article.authors = data[0].authors),
          (article.year = data[0].year),
          (article.title = data[0].title),
          (article.journal = data[0].journal),
          (article.volume = data[0].volume),
          (article.issue = data[0].issue),
          (article.start_page = data[0].start_page),
          (article.end_page = data[0].end_page),
          (article.link = data[0].link);
      }),
    );
  },
}));
