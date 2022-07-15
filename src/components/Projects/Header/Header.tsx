import { Container, OverviewContainer } from './styles';
import React, { useRef } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import AddButton from '../AddButton/AddButton';
import { useGeneralStore } from '@app/stores/generalStore';

export default function Header({ items, title, children }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { handleNavChange } = useGeneralStore((state) => ({
    handleNavChange: state.handleNavChange,
  }));

  const home = { icon: 'pi pi-home', command: () => navigate(`/projects`) };
  const menu = useRef(null);

  const menuItems = [
    {
      label: 'Research',
      items: [
        {
          label: 'Literature',
          command: () => {
            handleNavChange(`/projects/${projectId}/literature`);
          },
        },
        {
          label: 'Paradigms',
          command: () => {
            handleNavChange(`/projects/${projectId}/research_paradigms`);
          },
        },
        {
          label: 'Questions',
          command: () => {
            handleNavChange(`/projects/${projectId}/research_questions`);
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
            handleNavChange(`/projects/${projectId}/samples`);
          },
        },
        {
          label: 'Designs',
          command: () => {
            handleNavChange(`/projects/${projectId}/analytic_designs`);
          },
        },
        {
          label: 'Techniques',
          command: () => {
            handleNavChange(`/projects/${projectId}/analysis_techniques`);
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
            handleNavChange(`/projects/${projectId}/grants`);
          },
        },
        {
          label: 'Tables',
          command: () => {
            handleNavChange(`/projects/${projectId}/tables`);
          },
        },
        {
          label: 'Figures',
          command: () => {
            handleNavChange(`/projects/${projectId}/figures`);
          },
        },
        {
          label: 'Labs',
          command: () => {
            handleNavChange(`/projects/${projectId}/labs`);
          },
        },
        {
          label: 'Models',
          command: () => {
            handleNavChange(`/projects/${projectId}/models`);
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
            handleNavChange(`/projects/${projectId}/people`);
          },
        },
        {
          label: 'Key Terms',
          command: () => {
            handleNavChange(`/projects/${projectId}/key_terms`);
          },
        },
        {
          label: 'Journals',
          command: () => {
            handleNavChange(`/projects/${projectId}/journals`);
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
      <AddButton header={`+ New ${title}`} buttonLabel={`New ${title}`}>
        {children}
      </AddButton>
    </Container>
  );
}
