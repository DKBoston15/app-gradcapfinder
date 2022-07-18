export class AnalyticDesign {
  id: string | undefined;
  title: string | null;
  link: string | null;
  user_id?: string;
  project_id: string | undefined;
  design_technique: DesignTechniqueOptions;
  design_option: DesignOptionOptions;
  start_date: Date | Date[] | undefined;
  end_date: Date | Date[] | undefined;
  created_at?: string;
}

export enum DesignTechniqueOptions {
  Experimental,
  Observational,
}

export enum DesignOptionOptions {
  'Lab trials',
  'Field trials',
  'Cross-sectional',
  'Case-control',
  Cohort,
  Other,
}

export interface AnalyticDesignState {
  analytic_designs: AnalyticDesign[];
  filteredAnalyticDesigns: AnalyticDesign[];
  getFilteredAnalyticDesigns: (id: string) => Promise<void>;
  getAnalyticDesigns: () => Promise<void>;
  addAnalyticDesign: (newAnalyticDesign: AnalyticDesign) => Promise<void>;
  deleteAnalyticDesign: (id: string) => Promise<void>;
  patchAnalyticDesign: (newAnalyticDesign: AnalyticDesign) => Promise<void>;
}
