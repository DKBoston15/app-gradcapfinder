import { useEffect, useState } from 'react';
import { Container } from '../styles/globalPage.styles';
import Layout from '../layouts/Layout';
import ProjectNavBar from '..//components/Navigation/ProjectNavBar/ProjectNavBar';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Overview from './ProjectRoutes/Overview';
import AnalyticDesigns from './ProjectRoutes/AnalyticDesigns';
import AnalysisTechniques from './ProjectRoutes/AnalysisTechniques';
import Articles from './ProjectRoutes/Articles';
import People from './ProjectRoutes/People';
import Figures from './ProjectRoutes/Figures';
import Journals from './ProjectRoutes/Journals';
import KeyTerms from './ProjectRoutes/KeyTerms';
import Labs from './ProjectRoutes/Labs';
import Models from './ProjectRoutes/Models';
import ResearchParadigms from './ProjectRoutes/ResearchParadigms';
import ResearchQuestions from './ProjectRoutes/ResearchQuestions';
import Tables from './ProjectRoutes/Tables';
import SamplingDesigns from './ProjectRoutes/Samplings';
import { useProjectStore } from '@app/stores/projectStore';
import { useArticleStore } from '@app/stores/articleStore';
import { supabase } from '@app/supabase';
import { useResearchParadigmsStore } from '../stores/researchParadigmsStore';
import { useResearchQuestionsStore } from '../stores/researchQuestionsStore';
import { useAnalysisTechniquesStore } from '../stores/analysisTechniquesStore';
import { useAnalyticDesignsStore } from '../stores/analyticDesignsStore';
import { usePeopleStore } from '../stores/peopleStore';
import { useFigureStore } from '../stores/figureStore';
import { useJournalStore } from '../stores/journalStore';
import { useKeyTermStore } from '../stores/keytermStore';
import { useLabsStore } from '../stores/labsStore';
import { useModelsStore } from '../stores/modelsStore';
import { useSamplingStore } from '../stores/samplingStore';

// On Articles page, need reference to research questions
// On page change, clear entry store
// Handle image upload in notes

// Add grants section
// Handle overview page
// Designs
// - Types (In Powerpoint, 2 FieldOfStudyContainer, 1 conditional)
// - Starting Date
// - Ending date
// Handle figure upload
// Techniques
// - Types
// - Second sub field should be called Method (open text field)
// Figures
// - Figure number
// - Title
// - Types
// - Place to store figure
// Tables
// - Type
// - Table Number
// - Title
// - Rows Count
// - Column Count
// - Ability to create a table
// Labs
// - Equipment
// - Instruments
// - Products
// - Patents
// - Manager
// - Contact Info
// - Vendors (List with contact info)
// Models
// - Types
// - Place to store figures
// People
// They can have multiple project roles below
// - Data Analysis
// - Writing
// - Data Collection
// - Project Reviewer
// - Principal Investigator
// - Co Principal Investigator
// - Research Assistant
// Grants
// - Grant Number
// - Granting Organization
// - Date that the grant is funded
// - Annual or Longitudanal Grant for reporting out
//   - Ability to store multiple dates
// - Grant Amount

// Research Overview
// - List of people with the mentor, colleague, or chair role
// - List of next 4 tasks due for the project
// - Start date and end date for the project
// - List of journals you want to publish your results in
// - What papers do you anticipate writing?
// - What conferences do you want to go to
// - Dane is emailing me the project checklist

export default function Projects() {
  const getProjects = useProjectStore((state: any) => state.getProjects);
  let [searchParams, setSearchParams] = useSearchParams();
  const getArticles = useArticleStore((state: any) => state.getArticles);
  const getResearchParadigms = useResearchParadigmsStore(
    (state: any) => state.getResearchParadigms,
  );
  const getResearchQuestions = useResearchQuestionsStore(
    (state: any) => state.getResearchQuestions,
  );
  const getAnalysisTechniques = useAnalysisTechniquesStore(
    (state: any) => state.getAnalysisTechniques,
  );
  const getAnalyticDesigns = useAnalyticDesignsStore((state: any) => state.getAnalyticDesigns);
  const getFigures = useFigureStore((state: any) => state.getFigures);
  const getJournals = useJournalStore((state: any) => state.getJournals);
  const getKeyTerms = useKeyTermStore((state: any) => state.getKeyTerms);
  const getLabs = useLabsStore((state: any) => state.getLabs);
  const getModels = useModelsStore((state: any) => state.getModels);
  const getSamplings = useSamplingStore((state: any) => state.getSamplings);
  const getPeople = usePeopleStore((state: any) => state.getPeople);
  const [loading, setLoading] = useState(true);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const setSelectedProject = useProjectStore((state: any) => state.setSelectedProject);
  const projects = useProjectStore((state: any) => state.projects);
  const location = useLocation();
  const navigate = useNavigate();
  const user = supabase.auth.user();

  useEffect(() => {
    const getProjectData = async () => {
      const initialProjects = await getProjects();
      const projectId = searchParams.get('projectId');
      if (projectId) {
        const project = initialProjects.filter((project: any) => project.id == projectId);
        setSelectedProject(projectId, project[0].name);
        await getArticles(projectId);
        await getResearchParadigms(projectId);
        await getResearchQuestions(projectId);
        await getAnalysisTechniques(projectId);
        await getAnalyticDesigns(projectId);
        await getFigures(projectId);
        await getJournals(projectId);
        await getKeyTerms(projectId);
        await getLabs(projectId);
        await getModels(projectId);
        await getSamplings(projectId);
        await getPeople(projectId);

        setLoading(false);
      } else {
        setSelectedProject(initialProjects[0].id, initialProjects[0].name);
        const articles = await getArticles(initialProjects[0].id);
        const researchParadigms = await getResearchParadigms(initialProjects[0].id);
        const analysisTechniques = await getAnalysisTechniques(initialProjects[0].id);
        const analyticDesigns = await getAnalyticDesigns(initialProjects[0].id);
        const figures = await getFigures(initialProjects[0].id);
        const journals = await getJournals(initialProjects[0].id);
        const keyTerms = await getKeyTerms(initialProjects[0].id);
        const labs = await getLabs(initialProjects[0].id);
        const models = await getModels(initialProjects[0].id);
        const samplings = await getSamplings(initialProjects[0].id);
        const people = await getPeople(initialProjects[0].id);
        setLoading(false);
      }
    };
    getProjectData();
    if (location.pathname === '/projects') navigate('/projects/overview');
  }, []);

  const SubPage = () => {
    if (location.pathname === '/projects') return <Overview />;
    if (location.pathname === '/projects/overview') return <Overview />;
    if (location.pathname === '/projects/analytic_designs')
      return (
        <AnalyticDesigns
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/analysis_techniques')
      return (
        <AnalysisTechniques
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname.includes('/projects/articles'))
      return (
        <Articles
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/people')
      return (
        <People
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/figures')
      return (
        <Figures
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/journals')
      return (
        <Journals
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/key_terms')
      return (
        <KeyTerms
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/labs')
      return (
        <Labs
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/models')
      return (
        <Models
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/research_paradigms')
      return (
        <ResearchParadigms
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/research_questions')
      return (
        <ResearchQuestions
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/tables')
      return (
        <Tables
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/sampling')
      return (
        <SamplingDesigns
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    return <div>No Path</div>;
  };

  return (
    <Layout>
      <ProjectNavBar />
      {!loading && (
        <Container>
          <SubPage />
        </Container>
      )}
    </Layout>
  );
}
