export interface Literature {
  id: number;
  analytic_design: string[];
  authors: string[];
  created_at: string;
  end_page: string;
  issue: string;
  journal: string;
  link: string;
  research_design: string;
  research_paradigm: string;
  sampling_design: string;
  sampling_technique: string;
  start_page: string;
  title: string;
  user_id: string;
  volume: string;
  year: string;
}

export interface Project {
  id: number;
  description: string;
  name: string;
  standard_id: string;
  user_id: string;
}

export interface DropdownProject {
  label: string;
  value: number;
}

export interface IAnalysisTechniques {
  id: number;
  title: string;
  link: string;
  user_id: string;
  project_id: number;
  technique: string;
  method: string;
  created_at: string;
}

export interface IAnalyticDesigns {
  id: number;
  title: string;
  link: string;
  user_id: string;
  project_id: number;
  design_technique: string;
  design_option: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface IFeedEntries {
  id: number;
  category: string;
  content: string;
  user_id: string;
  connected_id: string;
  date: Date;
  completed_date: Date;
  project_id: number;
  section: string;
  created_at: string;
  updated_at: string;
}

export interface IFigures {
  id: number;
  title: string;
  link: string;
  user_id: string;
  project_id: number;
  type: string;
  number: string;
  created_at: string;
}

export interface IGrants {
  id: string;
  title: string;
  link: string;
  user_id: string;
  project_id: number;
  number: string;
  granting_organization: string;
  fund_date: string;
  amount: string;
  reporting_date_1: string;
  reporting_date_2: string;
  reporting_date_3: string;
  reporting_date_4: string;
  created_at: string;
}