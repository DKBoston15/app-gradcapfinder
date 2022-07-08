import { useProjectStore } from '@app/stores/projectStore';
import React from 'react';
import { Container, NavList, NavLink, OverviewNavLink, SectionHeader } from './styles';
import { Divider } from 'primereact/divider';

export default function SectionsList({ setVisibleBottom }: any) {
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const closeDropdown = async () => {
    setVisibleBottom(false);
  };

  return (
    <Container>
      <NavList>
        <OverviewNavLink to="/projects/overview">
          <SectionHeader onClick={() => closeDropdown()}>Overview</SectionHeader>
        </OverviewNavLink>
        <SectionHeader>Research</SectionHeader>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/literature?projectId=${selectedProject}`}>
          Literature
        </NavLink>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/research_paradigms?projectId=${selectedProject}`}>
          Paradigms
        </NavLink>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/research_questions?projectId=${selectedProject}`}>
          Questions
        </NavLink>
        <Divider />
        <SectionHeader>Analysis</SectionHeader>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/samples?projectId=${selectedProject}`}>
          Samples
        </NavLink>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/analytic_designs?projectId=${selectedProject}`}>
          Designs
        </NavLink>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/analysis_techniques?projectId=${selectedProject}`}>
          Techniques
        </NavLink>
        <Divider />
        <SectionHeader>Professionalism</SectionHeader>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/grants?projectId=${selectedProject}`}>
          Grants
        </NavLink>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/figures?projectId=${selectedProject}`}>
          Figures
        </NavLink>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/tables?projectId=${selectedProject}`}>
          Tables
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/projects/labs?projectId=${selectedProject}`}>
          Labs
        </NavLink>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/models?projectId=${selectedProject}`}>
          Models
        </NavLink>
        <Divider />
        <SectionHeader>Writing</SectionHeader>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/people?projectId=${selectedProject}`}>
          People
        </NavLink>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/key_terms?projectId=${selectedProject}`}>
          Key Terms
        </NavLink>
        <NavLink
          onClick={() => closeDropdown()}
          to={`/projects/journals?projectId=${selectedProject}`}>
          Journals
        </NavLink>
      </NavList>
    </Container>
  );
}
