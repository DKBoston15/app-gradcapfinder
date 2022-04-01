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
import Authors from './ProjectRoutes/Authors';
import Figures from './ProjectRoutes/Figures';
import Journals from './ProjectRoutes/Journals';
import KeyTerms from './ProjectRoutes/KeyTerms';
import Labs from './ProjectRoutes/Labs';
import Models from './ProjectRoutes/Models';
import ResearchParadigms from './ProjectRoutes/ResearchParadigms';
import ResearchQuestions from './ProjectRoutes/ResearchQuestions';
import Tables from './ProjectRoutes/Tables';
import SamplingDesigns from './ProjectRoutes/Samplings';
import SamplingTechniques from './ProjectRoutes/SamplingTechniques';
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
  const getAuthors = usePeopleStore((state: any) => state.getAuthors);
  const getFigures = useFigureStore((state: any) => state.getFigures);
  const getJournals = useJournalStore((state: any) => state.getJournals);
  const getKeyTerms = useKeyTermStore((state: any) => state.getKeyTerms);
  const getLabs = useLabsStore((state: any) => state.getLabs);
  const getModels = useModelsStore((state: any) => state.getModels);
  const getSamplings = useSamplingStore((state: any) => state.getSamplings);
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
        await getAuthors(projectId);
        await getFigures(projectId);
        await getJournals(projectId);
        await getKeyTerms(projectId);
        await getLabs(projectId);
        await getModels(projectId);
        await getSampling(projectId);

        setLoading(false);
      } else {
        setSelectedProject(initialProjects[0].id, initialProjects[0].name);
        const articles = await getArticles(initialProjects[0].id);
        const researchParadigms = await getResearchParadigms(initialProjects[0].id);
        const analysisTechniques = await getAnalysisTechniques(initialProjects[0].id);
        const analyticDesigns = await getAnalyticDesigns(initialProjects[0].id);
        const authors = await getAuthors(initialProjects[0].id);
        const figures = await getFigures(initialProjects[0].id);
        const journals = await getJournals(initialProjects[0].id);
        const keyTerms = await getKeyTerms(initialProjects[0].id);
        const labs = await getLabs(initialProjects[0].id);
        const models = await getModels(initialProjects[0].id);
        const samplings = await getSamplings(initialProjects[0].id);
        setLoading(false);
      }
    };
    getProjectData();
    if (location.pathname === '/projects') navigate('/projects/overview');

    const realtimeProfileUpdatesProjects = supabase
      .from('projects')
      .on('*', (payload) => {
        getProjects(user?.id);
      })
      .subscribe();

    const realtimeProfileUpdatesArticles = supabase
      .from('articles')
      .on('*', (payload) => {
        if (selectedProject) {
          getArticles(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesResearchParadigms = supabase
      .from('research_paradigms')
      .on('*', (payload) => {
        if (selectedProject) {
          getResearchParadigms(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesResearchQuestions = supabase
      .from('research_questions')
      .on('*', (payload) => {
        if (selectedProject) {
          getResearchQuestions(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesAnalysisTechniques = supabase
      .from('analysis_techniques')
      .on('*', (payload) => {
        if (selectedProject) {
          getAnalysisTechniques(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesAnalyticDesigns = supabase
      .from('analytic_designs')
      .on('*', (payload) => {
        if (selectedProject) {
          getAnalyticDesigns(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesPeople = supabase
      .from('people')
      .on('*', (payload) => {
        if (selectedProject) {
          getAuthors(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesFigures = supabase
      .from('figures')
      .on('*', (payload) => {
        if (selectedProject) {
          getFigures(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesJournals = supabase
      .from('journals')
      .on('*', (payload) => {
        if (selectedProject) {
          getJournals(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesKeyTerms = supabase
      .from('key_terms')
      .on('*', (payload) => {
        if (selectedProject) {
          getKeyTerms(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesLabs = supabase
      .from('labs')
      .on('*', (payload) => {
        if (selectedProject) {
          getLabs(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesModels = supabase
      .from('models')
      .on('*', (payload) => {
        if (selectedProject) {
          getModels(selectedProject);
        }
      })
      .subscribe();

    const realtimeProfileUpdatesSamplingDesigns = supabase
      .from('samplings')
      .on('*', (payload) => {
        if (selectedProject) {
          getSamplings(selectedProject);
        }
      })
      .subscribe();
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
    if (location.pathname === '/projects/authors') return <Authors />;
    if (location.pathname === '/projects/figures')
      return (
        <Figures
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === '/projects/journals') return <Journals />;
    if (location.pathname === '/projects/key_terms') return <KeyTerms />;
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
