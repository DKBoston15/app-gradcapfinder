import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CheckboxContainer,
  CheckboxLabel,
  CustomDropdown,
} from './styles';
import { useJournalStore } from '@app/stores/journalStore';
import { Checkbox } from 'primereact/checkbox';
import { useParams } from 'react-router-dom';
import { journalPublicationFrequencyOptions } from '@app/constants';
import { useProjectStore } from '@app/stores/projectStore';
import { Dropdown } from 'primereact/dropdown';

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [primary, setPrimary] = useState(false);
  const [primaryCount, setPrimaryCount] = useState(0);
  const [impactScore, setImpactScore] = useState('');
  const [editor, setEditor] = useState('');
  const [publicationFrequency, setPublicationFrequency] = useState('');
  const [association, setAssociation] = useState('');
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };

  const { journals, addJournal } = useJournalStore((state) => ({
    journals: state.journals,
    addJournal: state.addJournal,
  }));

  useEffect(() => {
    const getData = async () => {
      const projectPeople = journals.filter((journal) => journal.project_id == selectedProject);
      let extractedValue = projectPeople.map((item: any) => item.primary);
      let count = 0;
      for (let primaryValue = 0; primaryValue < extractedValue.length; primaryValue++) {
        if (extractedValue[primaryValue]) {
          count++;
        }
      }
      setPrimaryCount(count);
    };
    getData();
  }, []);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addJournal(
        title,
        link,
        impactScore,
        editor,
        publicationFrequency,
        association,
        // @ts-ignore
        props.connectedEntity,
        primary,
        selectedProject,
      );
    },
  }));

  return (
    <div>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
          id="title"
          // @ts-ignore
          value={title}
          // @ts-ignore
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title">Title</label>
      </FirstFloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
          id="link"
          // @ts-ignore
          value={link}
          // @ts-ignore
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor="link">Link</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
          id="impactScore"
          // @ts-ignore
          value={impactScore}
          // @ts-ignore
          onChange={(e) => setImpactScore(e.target.value)}
        />
        <label htmlFor="impactScore">Impact Score</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
          id="editor"
          // @ts-ignore
          value={editor}
          // @ts-ignore
          onChange={(e) => setEditor(e.target.value)}
        />
        <label htmlFor="editor">Editor</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
          id="association"
          // @ts-ignore
          value={association}
          // @ts-ignore
          onChange={(e) => setAssociation(e.target.value)}
        />
        <label htmlFor="association">Association</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomDropdown
          style={{ width: '100%' }}
          options={journalPublicationFrequencyOptions}
          value={publicationFrequency}
          onChange={(e) => setPublicationFrequency(e.target.value)}
          id="pubFreq"
        />
        <label htmlFor="pubFreq">Publication Frequency</label>
      </FloatingLabelContainer>
      <CheckboxContainer className="field-checkbox" style={{ width: '100%' }}>
        <Checkbox
          disabled={primaryCount >= 7 ? true : false}
          tooltip="This project already has a max of 7 journals set as a primary journal"
          tooltipOptions={{ disabled: primaryCount >= 7 ? false : true }}
          inputId="primary"
          checked={primary}
          onChange={(e) => setPrimary(e.checked)}
        />
        <CheckboxLabel htmlFor="primary">Primary Journal?</CheckboxLabel>
      </CheckboxContainer>
      <FloatingLabelContainer>
        <Dropdown
          style={{ width: '100%' }}
          value={selectedProject}
          options={projects}
          onChange={(e) => {
            let newProject = e.value;
            if (e.value === 0) newProject = true;
            if (newProject) {
              setSelectedProject(e.value);
            } else {
              setSelectedProject();
            }
          }}
          itemTemplate={projectItemTemplate}
          placeholder="Select a Project"
          id="projectDropdown"
          optionLabel="name"
          optionValue="id"
          showClear
        />
      </FloatingLabelContainer>
    </div>
  );
});

export default Child;
