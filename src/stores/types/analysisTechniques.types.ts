export class AnalysisTechnique {
  id: string | undefined;
  title: string | null;
  link: string | null;
  user_id?: string;
  project_id: number | undefined;
  technique: AnalysisTechniqueOption;
  method: string;
  created_at?: string;
}

export enum AnalysisTechniqueOption {
  Qualitative,
  Quantitative,
  Textual,
  Statistical,
  Diagnostic,
  Predictive,
  Prescriptive,
  Other,
}

export interface AnalysisTechniqueState {
  analysis_techniques: AnalysisTechnique[];
  filteredAnalysisTechniques: AnalysisTechnique[];
  getFilteredAnalysisTechniques: (id: string) => Promise<void>;
  getAnalysisTechniques: () => Promise<void>;
  addAnalysisTechnique: (newAnalysisTechnique: AnalysisTechnique) => Promise<void>;
  deleteAnalysisTechnique: (id: string) => Promise<void>;
  patchAnalysisTechnique: (newAnalysisTechnique: AnalysisTechnique) => Promise<void>;
}
