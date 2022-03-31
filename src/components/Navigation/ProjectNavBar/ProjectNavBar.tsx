import { useEffect } from 'react';
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

export default function ProjectNavBar() {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const getArticles = useArticleStore((state: any) => state.getArticles);
  const dropdownProjects = useProjectStore((state: any) => state.dropdownProjects);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const setSelectedProject = useProjectStore((state: any) => state.setSelectedProject);
  useEffect(() => {
    if (dropdownProjects[0] && !selectedProject) {
      setSelectedProject(dropdownProjects[0].value, dropdownProjects[0].label);
    }
  }, [dropdownProjects]);

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
              setSelectedProject(scopedSelectedProject[0].value, scopedSelectedProject[0].label);
            }}
          />
          <NavList>
            <OverviewNavLink to="/projects/overview">
              <SectionHeader>Overview </SectionHeader>
            </OverviewNavLink>

            <SectionHeader>Research</SectionHeader>

            <NavLink to="/projects/articles">Articles</NavLink>
            <NavLink to="/projects/research_paradigms">Research Paradigms</NavLink>
            <NavLink to="/projects/research_questions">Research Questions</NavLink>
            <NavLink to="/projects/sampling_designs">Sampling Designs</NavLink>
            <NavLink to="/projects/sampling_techniques">Sampling Techniques</NavLink>
            <Divider />
            <SectionHeader>Analysis</SectionHeader>
            <NavLink to="/projects/analytic_designs">Analytic Designs</NavLink>
            <NavLink to="/projects/analysis_techniques">Analysis Techniques</NavLink>
            <Divider />
            <SectionHeader>Professionalism</SectionHeader>
            <NavLink to="/projects/figures">Figures</NavLink>
            <NavLink to="/projects/tables">Tables</NavLink>
            <NavLink to="/projects/labs">Labs</NavLink>
            <NavLink to="/projects/models">Models</NavLink>
            <Divider />
            <SectionHeader>Writing</SectionHeader>
            <NavLink to="/projects/authors">Authors</NavLink>
            <NavLink to="/projects/key_terms">Key Terms</NavLink>
            <NavLink to="/projects/journals">Journals</NavLink>
          </NavList>
        </>
      )}
    </Container>
  );
}
