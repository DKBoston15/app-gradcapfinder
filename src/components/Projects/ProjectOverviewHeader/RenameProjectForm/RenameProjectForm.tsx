import { CustomInputText, CustomInputTextarea, FloatingLabelContainer } from './styles';
import React from 'react';
interface RenameNewProjectFormProps {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

export default function RenameNewProjectForm({
  name,
  setName,
  description,
  setDescription,
}: RenameNewProjectFormProps) {
  return (
    <div>
      <span className="p-float-label">
        <CustomInputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="name">Name</label>
      </span>

      <FloatingLabelContainer className="p-float-label">
        <CustomInputTextarea
          id="description"
          rows={5}
          cols={30}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="description">Description</label>
      </FloatingLabelContainer>
    </div>
  );
}
