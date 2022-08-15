import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { checklists } from '@app/checklists/index';
import useChecklistStore from '@app/stores/checklistStore';
import { Container, FormTitle } from './styles';
import { v4 } from 'uuid';

export default function NewChecklistForm() {
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  const { addChecklist } = useChecklistStore((state) => ({
    addChecklist: state.addChecklist,
  }));

  const handleAddition = (checklist) => {
    checklist.id = v4();
    addChecklist(checklist);
  };

  return (
    <Container>
      <FormTitle>Add A New Checklist</FormTitle>
      <Dropdown
        value={selectedTemplate}
        options={checklists}
        onChange={(e) => {
          handleAddition(e.value);
        }}
        placeholder="Select a Template"
        optionLabel="name"
      />
    </Container>
  );
}
