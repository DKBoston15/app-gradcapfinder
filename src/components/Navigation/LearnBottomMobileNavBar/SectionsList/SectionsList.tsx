import React from 'react';
import { Container, NavList, NavLink, OverviewNavLink, SectionHeader } from './styles';
import { Divider } from 'primereact/divider';

export default function SectionsList({ setVisibleBottom }: any) {
  const closeDropdown = async () => {
    setVisibleBottom(false);
  };

  return (
    <Container>
      <NavList>
        <OverviewNavLink to="/learn/overview">
          <SectionHeader onClick={() => closeDropdown()}>Overview</SectionHeader>
        </OverviewNavLink>
        <SectionHeader>Research</SectionHeader>
        <NavLink onClick={() => closeDropdown()} to={`/learn/research_paradigms`}>
          Paradigms
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/learn/research_questions`}>
          Questions
        </NavLink>
        <Divider />
        <SectionHeader>Analysis</SectionHeader>
        <NavLink onClick={() => closeDropdown()} to={`/learn/analysis_designs`}>
          Analytic Designs
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/learn/analysis_techniques`}>
          Analysis Techniques
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/learn/empirical_model`}>
          Empirical Model
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/learn/sampling`}>
          Sampling
        </NavLink>
        <Divider />
        <SectionHeader>Professionalism</SectionHeader>
        <NavLink onClick={() => closeDropdown()} to={`/learn/figures`}>
          Figures
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/learn/tables`}>
          Tables
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/learn/theoretical_models`}>
          Theoretical Models
        </NavLink>
        <Divider />
        <SectionHeader>Writing</SectionHeader>
        <NavLink onClick={() => closeDropdown()} to={`/learn/authors`}>
          Authors
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/learn/conceptual_models`}>
          Conceptual Models
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/learn/key_terms`}>
          Key Terms
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/learn/journals`}>
          Journals
        </NavLink>
      </NavList>
    </Container>
  );
}
