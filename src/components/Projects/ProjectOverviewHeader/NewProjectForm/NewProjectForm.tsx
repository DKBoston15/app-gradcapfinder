import { CustomInputText, CustomInputTextarea, FloatingLabelContainer } from './styles';
import React from 'react';
interface NewProjectFormProps {
  name: string;
  setName: (value: string) => void;
}

export default function NewProjectForm({ name, setName }: NewProjectFormProps) {
  return (
    <div>
      <span className="p-float-label">
        <CustomInputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="name">Name</label>
      </span>
    </div>
  );
}
