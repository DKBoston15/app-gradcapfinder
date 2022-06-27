import { Container, ChecklistGrid, Title } from './styles/checklist.styles';
import Layout from '../layouts/Layout';
import React from 'react';
import NewChecklistForm from '@app/components/Checklists/NewChecklistForm/NewChecklistForm';
import useChecklistStore from '@app/stores/checklistStore';
import ChecklistItem from '@app/components/Checklists/ChecklistItem/ChecklistItem';

export default function Checklist() {
  const { checklists } = useChecklistStore((state) => ({
    checklists: state.checklists,
  }));

  return (
    <Layout>
      <Container>
        <Title>Checklists</Title>
        <NewChecklistForm />
        <ChecklistGrid>
          {checklists.map((checklist) => (
            <ChecklistItem key={checklist.id} checklist={checklist} />
          ))}
        </ChecklistGrid>
      </Container>
    </Layout>
  );
}
