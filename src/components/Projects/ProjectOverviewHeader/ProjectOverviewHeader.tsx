import SplitAddProjectButton from './SplitAddProjectButton/SplitAddProjectButton';
import { Container, OverviewContainer } from './styles';
import React, { useRef } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

export default function ProjectOverviewHeader() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const items = [{ label: 'Overview', command: () => navigate(`/projects/${projectId}/overview`) }];

  const home = { icon: 'pi pi-home', command: () => navigate(`/projects`) };
  const menu = useRef(null);

  const menuItems = [
    {
      label: 'Research',
      items: [
        {
          label: 'Literature',
          command: () => {
            navigate(`/projects/${projectId}/literature`);
          },
        },
        {
          label: 'Paradigms',
          command: () => {
            navigate(`/projects/${projectId}/research_paradigms`);
          },
        },
        {
          label: 'Questions',
          command: () => {
            navigate(`/projects/${projectId}/research_questions`);
          },
        },
        {
          label: 'Designs',
          command: () => {
            navigate(`/projects/${projectId}/analytic_designs`);
          },
        },
      ],
    },
    {
      label: 'Analysis',
      items: [
        {
          label: 'Samples',
          command: () => {
            navigate(`/projects/${projectId}/samples`);
          },
        },
        {
          label: 'Techniques',
          command: () => {
            navigate(`/projects/${projectId}/analysis_techniques`);
          },
        },
      ],
    },
    {
      label: 'Professionalism',
      items: [
        {
          label: 'Grants',
          command: () => {
            navigate(`/projects/${projectId}/grants`);
          },
        },
        {
          label: 'Figures',
          command: () => {
            navigate(`/projects/${projectId}/figures`);
          },
        },
        {
          label: 'Tables',
          command: () => {
            navigate(`/projects/${projectId}/tables`);
          },
        },
        {
          label: 'Labs',
          command: () => {
            navigate(`/projects/${projectId}/labs`);
          },
        },
        {
          label: 'Models',
          command: () => {
            navigate(`/projects/${projectId}/models`);
          },
        },
      ],
    },
    {
      label: 'Writing',
      items: [
        {
          label: 'People',
          command: () => {
            navigate(`/projects/${projectId}/people`);
          },
        },
        {
          label: 'Key Terms',
          command: () => {
            navigate(`/projects/${projectId}/key_terms`);
          },
        },
        {
          label: 'Journals',
          command: () => {
            navigate(`/projects/${projectId}/journals`);
          },
        },
      ],
    },
  ];
  return (
    <Container>
      <OverviewContainer>
        <Menu model={menuItems} popup ref={menu} id="popup_menu" />
        <Button
          label="Menu"
          className="p-button-sm"
          style={{ marginRight: '1rem' }}
          icon="pi pi-bars"
          onClick={(event) => menu.current.toggle(event)}
          aria-controls="popup_menu"
          aria-haspopup
        />
        <BreadCrumb
          model={items}
          home={home}
          style={{ fontSize: '0.875rem', padding: '0.65625rem 1.09375rem' }}
        />
      </OverviewContainer>
      <SplitAddProjectButton />
    </Container>
  );
}
