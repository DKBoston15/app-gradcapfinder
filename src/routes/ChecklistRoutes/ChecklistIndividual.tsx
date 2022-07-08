import ListContainer from '@app/components/Checklists/ListContainer/ListContainer';
import useChecklistStore from '@app/stores/checklistStore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import { Container } from './styles';

export default function ChecklistIndividual() {
  const { checklists } = useChecklistStore((state) => ({
    checklists: state.checklists,
  }));
  const { id } = useParams();
  const [selectedChecklist, setSelectedChecklist] = useState();

  useEffect(() => {
    const checklist = checklists.filter((checklist: any) => checklist.id == id);
    setSelectedChecklist(checklist[0]);
  }, [checklists]);

  return (
    <Container>{selectedChecklist && <ListContainer checklist={selectedChecklist} />}</Container>
  );
}
