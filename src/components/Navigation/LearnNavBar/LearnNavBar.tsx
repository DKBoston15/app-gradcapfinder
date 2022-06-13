import React, { useEffect } from 'react';
import {
  Container,
  NavList,
  NavLink,
  SubNavHeader,
  SectionHeader,
  SectionHeaderNavLink,
  DisabledNavLink,
  DisabledSectionHeaderNavLink,
} from './styles';
import { Divider } from 'primereact/divider';

export default function ProjectNavBar() {
  return (
    <Container>
      <SubNavHeader>Learn</SubNavHeader>
      <NavList>
        <SectionHeaderNavLink to="/learn/overview">
          <SectionHeader>Overview</SectionHeader>
        </SectionHeaderNavLink>
        <SectionHeaderNavLink to="/learn/video_series">
          <SectionHeader>Video Series</SectionHeader>
        </SectionHeaderNavLink>
        <SectionHeaderNavLink to="/learn/research">
          <SectionHeader>Research</SectionHeader>
        </SectionHeaderNavLink>
        <NavLink to="/learn/research_paradigms">Paradigms</NavLink>
        <NavLink to="/learn/research_questions">Questions</NavLink>
        <Divider />
        <DisabledSectionHeaderNavLink to="/learn/analysis">
          <SectionHeader>Analysis</SectionHeader>
        </DisabledSectionHeaderNavLink>
        <DisabledNavLink to="/learn/analysis_designs">Designs</DisabledNavLink>
        <DisabledNavLink to="/learn/analysis_techniques">Techniques</DisabledNavLink>
        <DisabledNavLink to="/learn/empirical_model">Empirical Models</DisabledNavLink>
        <DisabledNavLink to="/learn/sampling">Samples</DisabledNavLink>
        <Divider />
        <DisabledSectionHeaderNavLink to="/learn/professionalism">
          <SectionHeader>Professionalism</SectionHeader>
        </DisabledSectionHeaderNavLink>
        <DisabledNavLink to="/learn/figures">Figures</DisabledNavLink>
        <DisabledNavLink to="/learn/tables">Tables</DisabledNavLink>
        <DisabledNavLink to="/learn/theoretical_models">Theoretical Models</DisabledNavLink>
        <Divider />
        <DisabledSectionHeaderNavLink to="/learn/writing">
          <SectionHeader>Writing</SectionHeader>
        </DisabledSectionHeaderNavLink>
        <DisabledNavLink to="/learn/authors">Authors</DisabledNavLink>
        <DisabledNavLink to="/learn/conceptual_models">Conceptual Models</DisabledNavLink>
        <DisabledNavLink to="/learn/key_terms">Key Terms</DisabledNavLink>
        <DisabledNavLink to="/learn/journals">Journals</DisabledNavLink>
      </NavList>
    </Container>
  );
}
