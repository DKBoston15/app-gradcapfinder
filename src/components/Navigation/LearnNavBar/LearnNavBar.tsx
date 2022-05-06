import React, { useEffect } from 'react';
import {
  Container,
  NavList,
  NavLink,
  SubNavHeader,
  SectionHeader,
  OverviewNavLink,
} from './styles';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Divider } from 'primereact/divider';

export default function ProjectNavBar() {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <Container>
      <SubNavHeader>Learn</SubNavHeader>
      <NavList>
        <OverviewNavLink to="/learn/overview">
          <SectionHeader>Overview </SectionHeader>
        </OverviewNavLink>
        <SectionHeader>Research</SectionHeader>
        <NavLink to="/learn/research_paradigms">Paradigms</NavLink>
        <NavLink to="/learn/research_questions">Questions</NavLink>
        <NavLink to="/learn/sampling_techniques">Sampling Techniques</NavLink>
        <NavLink to="/learn/sampling_designs">Sampling Designs</NavLink>
        <Divider />
        <SectionHeader>Analysis</SectionHeader>
        <NavLink to="/learn/analysis_designs">Design</NavLink>
        <NavLink to="/learn/analysis_techniques">Techniques</NavLink>
        <NavLink to="/learn/empirical_model">Empirical Model</NavLink>
        <Divider />
        <SectionHeader>Professionalism</SectionHeader>
        <NavLink to="/learn/figures">Figures</NavLink>
        <NavLink to="/learn/tables">Tables</NavLink>
        <NavLink to="/learn/theoretical_models">Theoretical Models</NavLink>
        <Divider />
        <SectionHeader>Writing</SectionHeader>
        <NavLink to="/learn/authors">Authors</NavLink>
        <NavLink to="/learn/conceptual_models">Conceptual Models</NavLink>
        <NavLink to="/learn/key_terms">Key Terms</NavLink>
        <NavLink to="/learn/journals">Journals</NavLink>
      </NavList>
    </Container>
  );
}
