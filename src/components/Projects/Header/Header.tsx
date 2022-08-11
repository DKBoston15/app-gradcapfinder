import { Container, OverviewContainer, ButtonContainer } from './styles';
import React, { useRef, useState } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import AddButton from '../AddButton/AddButton';
import { useGeneralStore } from '@app/stores/generalStore';
import AddProjectDialog from '../ProjectOverviewHeader/AddProjectDialog/AddProjectDialog';

export default function Header({ items, title, children }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [displayPrompt, setDisplayPrompt] = useState(false);
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
      <AddProjectDialog setDisplayPrompt={setDisplayPrompt} displayPrompt={displayPrompt} />
      <OverviewContainer>
        <BreadCrumb
          model={items}
          home={home}
          style={{ fontSize: '0.875rem', padding: '0.65625rem 1.09375rem' }}
        />
      </OverviewContainer>
      <ButtonContainer>
        <Button className="p-button-sm" onClick={() => setDisplayPrompt(true)}>
          + Add New Project
        </Button>
        <AddButton header={`+ New ${title}`} buttonLabel={`New ${title}`}>
          {children}
        </AddButton>
      </ButtonContainer>
    </Container>
  );
}
