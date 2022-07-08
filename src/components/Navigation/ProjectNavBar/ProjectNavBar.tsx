import React, { useEffect, useState } from 'react';
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
import { Divider } from 'primereact/divider';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function ProjectNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const projects = useProjectStore((state: any) => state.projects);
  const [active, setActive] = useState('');
  useEffect(() => {
    if (location.pathname.includes('literature')) {
      setActive('literature');
    }
    if (location.pathname.includes('research_paradigms')) {
      setActive('research_paradigms');
    }
    if (location.pathname.includes('research_questions')) {
      setActive('research_questions');
    }

    if (location.pathname.includes('grants')) {
      setActive('grants');
    }
    if (location.pathname.includes('analysis_techniques')) {
      setActive('analysis_techniques');
    }
    if (location.pathname.includes('analytic_designs')) {
      setActive('analytic_designs');
    }
    if (location.pathname.includes('people')) {
      setActive('people');
    }
    if (location.pathname.includes('figures')) {
      setActive('figures');
    }
    if (location.pathname.includes('journals')) {
      setActive('journals');
    }
    if (location.pathname.includes('key_terms')) {
      setActive('key_terms');
    }
    if (location.pathname.includes('labs')) {
      setActive('labs');
    }
    if (location.pathname.includes('models')) {
      setActive('models');
    }
    if (location.pathname.includes('samples')) {
      setActive('samples');
    }
  }, [location]);

  return (
    <Container>
      {projects && (
        <>
          <SubNavHeader>Projects</SubNavHeader>
          <CustomDropdown
            className="projectDropdown"
            options={projects.filter((project) => project.id !== 0)}
            optionLabel="name"
            optionValue="id"
            value={parseInt(projectId)}
            onChange={(e) => {
              let arr = location.pathname.split('/');
              arr[2] = e.value;
              if (arr.length === 5) {
                arr[4] = '';
              }
              const newPath = arr.join('/');
              navigate(newPath);
            }}
          />
          <NavList className="projectSelector">
            <OverviewNavLink to={`/projects/${projectId}/overview`}>
              <SectionHeader>Overview </SectionHeader>
            </OverviewNavLink>

            <SectionHeader>Research</SectionHeader>
            <NavLink active={active === 'literature'} to={`/projects/${projectId}/literature`}>
              Literature
            </NavLink>
            <NavLink
              active={active === 'research_paradigms'}
              to={`/projects/${projectId}/research_paradigms`}>
              Paradigms
            </NavLink>
            <NavLink
              active={active === 'research_questions'}
              to={`/projects/${projectId}/research_questions`}>
              Questions
            </NavLink>
            <Divider />
            <SectionHeader>Analysis</SectionHeader>
            <NavLink active={active === 'samples'} to={`/projects/${projectId}/samples`}>
              Samples
            </NavLink>
            <NavLink
              active={active === 'analytic_designs'}
              to={`/projects/${projectId}/analytic_designs`}>
              Designs
            </NavLink>
            <NavLink
              active={active === 'analysis_techniques'}
              to={`/projects/${projectId}/analysis_techniques`}>
              Techniques
            </NavLink>
            <Divider />
            <SectionHeader>Professionalism</SectionHeader>
            <NavLink active={active === 'grants'} to={`/projects/${projectId}/grants`}>
              Grants
            </NavLink>
            <NavLink active={active === 'figures'} to={`/projects/${projectId}/figures`}>
              Figures
            </NavLink>
            <NavLink active={active === 'tables'} to={`/projects/${projectId}/tables`}>
              Tables
            </NavLink>
            <NavLink active={active === 'labs'} to={`/projects/${projectId}/labs`}>
              Labs
            </NavLink>
            <NavLink active={active === 'models'} to={`/projects/${projectId}/models`}>
              Models
            </NavLink>
            <Divider />
            <SectionHeader>Writing</SectionHeader>
            <NavLink active={active === 'people'} to={`/projects/${projectId}/people`}>
              People
            </NavLink>
            <NavLink active={active === 'key_terms'} to={`/projects/${projectId}/key_terms`}>
              Key Terms
            </NavLink>
            <NavLink active={active === 'journals'} to={`/projects/${projectId}/journals`}>
              Journals
            </NavLink>
          </NavList>
        </>
      )}
    </Container>
  );
}
