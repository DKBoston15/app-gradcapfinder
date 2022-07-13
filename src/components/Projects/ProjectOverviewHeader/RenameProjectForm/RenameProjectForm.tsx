import { CustomInputText } from './styles';
import React from 'react';

interface RenameNewProjectFormProps {
  name: string;
  setName: (value: string) => void;
}

export default function RenameNewProjectForm({ name, setName }: RenameNewProjectFormProps) {
  return (
    <div>
      <span className="p-float-label">
        <CustomInputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="name">Name</label>
      </span>
    </div>
  );
}
