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
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const { handleNavChange } = useGeneralStore((state) => ({
    handleNavChange: state.handleNavChange,
  }));

  const home = { icon: 'pi pi-home', command: () => navigate(`/dashboard`) };

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
