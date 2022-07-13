import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useAnalysisTechniquesStore = create(
  persist((set) => ({

    analysis_techniques: [],
    filteredAnalysisTechniques: [],

    getFilteredAnalysisTechniques: async (id) => {
      const analysis_techniques = useAnalysisTechniquesStore.getState().analysis_techniques;
      const newAnalysisTechniques = analysis_techniques.filter((analysis_technique) => analysis_technique.project_id == parseInt(id));
      set({ filteredAnalysisTechniques: newAnalysisTechniques });
    },


    getAnalysisTechniques: async () => {
    const user = supabase.auth.user();
    const analysis_techniques = JSON.parse(sessionStorage.getItem('analysisTechniques'));
    await supabase
    .from('analysis_techniques')
    .select('*')
    .eq('user_id', user?.id)
    .order('title', { ascending: true })
    .then(({ data, error }) => {
      if (!error) {
        if (analysis_techniques) {
          if (analysis_techniques.state.analysis_techniques.length != data.length) {
            sessionStorage.removeItem('analysisTechniques');
            set({ analysis_techniques: data });
          }
        } else {
          set({ analysis_techniques: data });
        }
      }
    });

},

addAnalysisTechnique: async (    
  title: string,
  link: string,
  technique: string,
  method: string,
  selectedProject: number,
) => {
  const user = supabase.auth.user();
  const { data } = await supabase.from('analysis_techniques').insert([
    {
      link,
      title,
      technique,
      method,
      user_id: user.id,
      project_id: selectedProject,
    },
  ]);
  set((state) => ({
    analysis_techniques: [...state.analysis_techniques, { id: data[0].id, link, title, technique, method, project_id: selectedProject }]
  }))},

  deleteAnalysisTechnique: async (id) => {
      await supabase.from('analysis_techniques').delete().eq('id', id);
      set((state) => ({
        analysis_techniques: state.analysis_techniques.filter((analysis_technique) => analysis_technique.id !== id)
      }))},

  patchAnalysisTechnique: async (
    id: uuid,
    title: string,
    link: string,
    technique: string,
    method: string,
  ) => {
    await supabase
    .from('analysis_techniques')
    .update({
      title,
      link,
      technique,
      method,
    })
    .eq('id', id);
    set((state) => ({
      analysis_techniques: state.analysis_techniques.map((analysis_technique) =>
      analysis_technique.id === id
      ? ({ ...analysis_technique, title, link, technique, method})
      : analysis_technique
    ),
    }))},

  }), {name: 'analysisTechniques', getStorage: () => sessionStorage})
);