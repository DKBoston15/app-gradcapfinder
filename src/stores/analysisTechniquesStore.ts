import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';
import { AnalysisTechnique, AnalysisTechniqueState } from './types/analysisTechniques.types';

export const useAnalysisTechniquesStore = create<AnalysisTechniqueState>(
  persist(
    (set) => ({
      analysis_techniques: <AnalysisTechnique[]>[],
      filteredAnalysisTechniques: <AnalysisTechnique[]>[],

      getFilteredAnalysisTechniques: async (id: string) => {
        const analysis_techniques = useAnalysisTechniquesStore.getState().analysis_techniques;
        const newAnalysisTechniques = analysis_techniques.filter(
          (analysis_technique) => analysis_technique.project_id == parseInt(id),
        );
        set({ filteredAnalysisTechniques: newAnalysisTechniques });
      },

      getAnalysisTechniques: async () => {
        const user = supabase.auth.user();
        const analysis_techniques = JSON.parse(sessionStorage.getItem('analysisTechniques') || '');
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

      addAnalysisTechnique: async (newAnalysisTechnique: AnalysisTechnique) => {
        const user = supabase.auth.user();
        const { data } = await supabase.from('analysis_techniques').insert([
          {
            link: newAnalysisTechnique.link,
            title: newAnalysisTechnique.title,
            technique: newAnalysisTechnique.technique,
            method: newAnalysisTechnique.method,
            user_id: user?.id,
            project_id: newAnalysisTechnique.project_id,
          },
        ]);
        if (data) {
          set((state) => ({
            analysis_techniques: [
              ...state.analysis_techniques,
              {
                id: data[0].id,
                link: newAnalysisTechnique.link,
                title: newAnalysisTechnique.title,
                technique: newAnalysisTechnique.technique,
                method: newAnalysisTechnique.method,
                project_id: newAnalysisTechnique.project_id,
              },
            ],
          }));
        }
      },

      deleteAnalysisTechnique: async (id: string) => {
        await supabase.from('analysis_techniques').delete().eq('id', id);
        set((state) => ({
          analysis_techniques: state.analysis_techniques.filter(
            (analysis_technique: AnalysisTechnique) => analysis_technique.id !== id,
          ),
        }));
      },

      patchAnalysisTechnique: async (updatedAnalysisTechnique: AnalysisTechnique) => {
        await supabase
          .from('analysis_techniques')
          .update({
            title: updatedAnalysisTechnique.title,
            link: updatedAnalysisTechnique.link,
            technique: updatedAnalysisTechnique.technique,
            method: updatedAnalysisTechnique.method,
            project_id: updatedAnalysisTechnique.project_id,
          })
          .eq('id', updatedAnalysisTechnique.id);
        set((state) => ({
          analysis_techniques: state.analysis_techniques.map(
            (analysis_technique: AnalysisTechnique) =>
              analysis_technique.id === updatedAnalysisTechnique.id
                ? {
                    ...analysis_technique,
                    title: updatedAnalysisTechnique.title,
                    link: updatedAnalysisTechnique.link,
                    technique: updatedAnalysisTechnique.technique,
                    method: updatedAnalysisTechnique.method,
                    project_id: updatedAnalysisTechnique.project_id,
                  }
                : analysis_technique,
          ),
        }));
      },
    }),
    { name: 'analysisTechniques', getStorage: () => sessionStorage },
  ),
);
