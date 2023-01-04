import { Container, OverviewContainer, ButtonContainer } from './styles';
import React, { useRef, useState } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import AddButton from '../AddButton/AddButton';
import AddProjectDialog from '../ProjectOverviewHeader/AddProjectDialog/AddProjectDialog';

export default function Header({ items, title, children }) {
  const navigate = useNavigate();
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const toast = useRef(null);
  const home = { icon: 'pi pi-home', command: () => navigate(`/dashboard`) };

  return (
    <Container>
      <Toast ref={toast} />
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
        <AddButton header={`+ New ${title}`} buttonLabel={`New ${title}`} toast={toast}>
          {children}
        </AddButton>
      </ButtonContainer>
    </Container>
  );
}
