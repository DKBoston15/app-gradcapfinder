import useChecklistStore from '@app/stores/checklistStore';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import ChecklistItem from '../ChecklistItem/ChecklistItem';
import { Container, ProjectGrid } from './styles';

export default function ChecklistSelection() {
  const { checklists } = useChecklistStore((state) => ({
    checklists: state.checklists,
  }));
  const [displayPrompt, setDisplayPrompt] = useState(false);

  return (
    <Container>
      <Button
        label="+ New Checklist"
        className="p-button-sm"
        onClick={() => setDisplayPrompt(true)}
      />
      <ProjectGrid>
        {checklists.map((checklist) => (
          <ChecklistItem key={checklist.id} checklist={checklist} />
        ))}
      </ProjectGrid>
    </Container>
  );
}
