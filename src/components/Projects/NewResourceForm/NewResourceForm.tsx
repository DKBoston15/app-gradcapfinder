import { CustomInputText } from './styles';
import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { sections } from '@app/constants';
interface NewResourceFormProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  link: string;
  setLink: (value: string) => void;
  section: string;
  setSection: (value: string) => void;
}

export default function NewResourceForm({
  title,
  setTitle,
  description,
  setDescription,
  link,
  setLink,
  section,
  setSection,
}: NewResourceFormProps) {
  return (
    <div>
      <span className="p-float-label" style={{ marginBottom: '1.5rem' }}>
        <CustomInputText
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%' }}
        />
        <label htmlFor="title">Title</label>
      </span>
      <span className="p-float-label" style={{ marginBottom: '1.5rem' }}>
        <CustomInputText
          id="description"
          style={{ width: '100%' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="description">Description</label>
      </span>
      <span className="p-float-label" style={{ marginBottom: '1.5rem' }}>
        <CustomInputText
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ width: '100%' }}
        />
        <label htmlFor="link">Link</label>
      </span>
      <span className="p-float-label">
        <Dropdown
          id="section"
          value={section}
          options={sections}
          style={{ width: '100%' }}
          onChange={(e) => {
            setSection(e.value);
          }}
          optionLabel="name"
        />
        <label htmlFor="section">Section</label>
      </span>
    </div>
  );
}
