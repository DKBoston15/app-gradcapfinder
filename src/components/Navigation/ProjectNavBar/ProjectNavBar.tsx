import React, { useEffect } from 'react';
import {
  Container,
  NavList,
  NavLink,
  SubNavHeader,
  CustomDropdown,
  SectionHeader,
  OverviewNavLink,
} from './styles';
import { useProjectStore } from '@app/stores/projectStore';
import { DropdownProject } from '@app/types/index';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useArticleStore } from '@app/stores/articleStore';
import { Divider } from 'primereact/divider';
import { useResearchParadigmsStore } from '../../../stores/researchParadigmsStore';
import { useResearchQuestionsStore } from '../../../stores/researchQuestionsStore';
import { useAnalysisTechniquesStore } from '../../../stores/analysisTechniquesStore';
import { useAnalyticDesignsStore } from '../../../stores/analyticDesignsStore';
import { usePeopleStore } from '../../../stores/peopleStore';
import { useFigureStore } from '../../../stores/figureStore';
import { useJournalStore } from '../../../stores/journalStore';
import { useKeyTermStore } from '../../../stores/keytermStore';
import { useLabsStore } from '../../../stores/labsStore';
import { useModelsStore } from '../../../stores/modelsStore';
import { useSamplingStore } from '../../../stores/samplingStore';
import { useGrantStore } from '@app/stores/grantStore';

export default function ProjectNavBar() {
  const location = useLocation();
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
  const getPeople = usePeopleStore((state: any) => state.getPeople);
  const getFigures = useFigureStore((state: any) => state.getFigures);
  const getJournals = useJournalStore((state: any) => state.getJournals);
  const getKeyTerms = useKeyTermStore((state: any) => state.getKeyTerms);
  const getLabs = useLabsStore((state: any) => state.getLabs);
  const getModels = useModelsStore((state: any) => state.getModels);
  const getGrants = useGrantStore((state: any) => state.getGrants);
  const getSamplings = useSamplingStore((state: any) => state.getSamplings);
  const dropdownProjects = useProjectStore((state: any) => state.dropdownProjects);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const setSelectedProject = useProjectStore((state: any) => state.setSelectedProject);
  useEffect(() => {
    if (dropdownProjects[0] && !selectedProject) {
      setSelectedProject(dropdownProjects[0].value, dropdownProjects[0].label);
    }
  }, [dropdownProjects]);

  useEffect(() => {
    console.log('');
  }, [selectedProject]);

  return (
    <Container>
      {dropdownProjects && (
        <>
          <SubNavHeader>Projects</SubNavHeader>
          <CustomDropdown
            options={dropdownProjects}
            value={selectedProject}
            onChange={(e) => {
              const scopedSelectedProject = dropdownProjects.filter(
                (project: DropdownProject) => project.value === e.value,
              );
              setSearchParams({
                projectId: scopedSelectedProject[0].value,
              });
              if (location.pathname.includes('articles')) {
                getArticles(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('research_paradigms')) {
                getResearchParadigms(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('research_questions')) {
                getResearchQuestions(scopedSelectedProject[0].value);
              }

              if (location.pathname.includes('grants')) {
                getGrants(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('analysis_techniques')) {
                getAnalysisTechniques(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('analytic_designs')) {
                getAnalyticDesigns(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('people')) {
                getPeople(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('figures')) {
                getFigures(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('journals')) {
                getJournals(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('key_terms')) {
                getKeyTerms(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('labs')) {
                getLabs(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('models')) {
                getModels(scopedSelectedProject[0].value);
              }
              if (location.pathname.includes('sampling')) {
                getSamplings(scopedSelectedProject[0].value);
              }
              setSelectedProject(scopedSelectedProject[0].value, scopedSelectedProject[0].label);
            }}
          />
          <NavList>
            <OverviewNavLink to="/projects/overview">
              <SectionHeader>Overview </SectionHeader>
            </OverviewNavLink>

            <SectionHeader>Research</SectionHeader>

            <NavLink to="/projects/articles">Articles</NavLink>
            <NavLink to="/projects/research_paradigms">Paradigms</NavLink>
            <NavLink to="/projects/research_questions">Questions</NavLink>
            <Divider />
            <SectionHeader>Analysis</SectionHeader>
            <NavLink to="/projects/sampling">Sampling</NavLink>
            <NavLink to="/projects/analytic_designs">Designs</NavLink>
            <NavLink to="/projects/analysis_techniques">Techniques</NavLink>
            <Divider />
            <SectionHeader>Professionalism</SectionHeader>
            <NavLink to="/projects/grants">Grants</NavLink>
            <NavLink to="/projects/figures">Figures</NavLink>
            <NavLink to="/projects/tables">Tables</NavLink>
            <NavLink to="/projects/labs">Labs</NavLink>
            <NavLink to="/projects/models">Models</NavLink>
            <Divider />
            <SectionHeader>Writing</SectionHeader>
            <NavLink to="/projects/people">People</NavLink>
            <NavLink to="/projects/key_terms">Key Terms</NavLink>
            <NavLink to="/projects/journals">Journals</NavLink>
          </NavList>
        </>
      )}
    </Container>
  );
}
