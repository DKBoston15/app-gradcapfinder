import React, { useEffect } from 'react';
import {
  Container,
  NavList,
  NavLink,
  SubNavHeader,
  SectionHeader,
  OverviewNavLink,
  DisabledNavLink,
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
        <Divider />
        <SectionHeader>Analysis</SectionHeader>
        <DisabledNavLink to="/learn/analysis_designs">Designs</DisabledNavLink>
        <DisabledNavLink to="/learn/analysis_techniques">Techniques</DisabledNavLink>
        <DisabledNavLink to="/learn/empirical_model">Empirical Models</DisabledNavLink>
        <DisabledNavLink to="/learn/sampling">Samples</DisabledNavLink>
        <Divider />
        <SectionHeader>Professionalism</SectionHeader>
        <DisabledNavLink to="/learn/figures">Figures</DisabledNavLink>
        <DisabledNavLink to="/learn/tables">Tables</DisabledNavLink>
        <DisabledNavLink to="/learn/theoretical_models">Theoretical Models</DisabledNavLink>
        <Divider />
        <SectionHeader>Writing</SectionHeader>
        <DisabledNavLink to="/learn/authors">Authors</DisabledNavLink>
        <DisabledNavLink to="/learn/conceptual_models">Conceptual Models</DisabledNavLink>
        <DisabledNavLink to="/learn/key_terms">Key Terms</DisabledNavLink>
        <DisabledNavLink to="/learn/journals">Journals</DisabledNavLink>
      </NavList>
    </Container>
  );
}
