export interface Article {
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
