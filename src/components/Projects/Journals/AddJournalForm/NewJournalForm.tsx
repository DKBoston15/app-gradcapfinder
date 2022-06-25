import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CheckboxContainer,
  CheckboxLabel,
  CustomDropdown,
} from './styles';
import { supabase } from '@app/supabase/index';
import { useJournalStore } from '@app/stores/journalStore';
import { Checkbox } from 'primereact/checkbox';
import { useParams } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [primary, setPrimary] = useState(false);
  const [primaryCount, setPrimaryCount] = useState(0);
  const [impactScore, setImpactScore] = useState('');
  const [editor, setEditor] = useState('');
  const [publicationFrequency, setPublicationFrequency] = useState('');
  const [association, setAssociation] = useState('');
  const { projectId } = useParams();

  const { journals, addJournal } = useJournalStore((state) => ({
    journals: state.journals,
    addJournal: state.addJournal,
  }));

  useEffect(() => {
    const getData = async () => {
      const projectPeople = journals.filter((journal) => journal.project_id == projectId);
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
        projectId,
      );
    },
  }));

  return (
    <Container>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
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
          options={[
            { label: 'Monthly', value: 'Monthly' },
            { label: 'Bi-Monthly', value: 'Bi-Monthly' },
            { label: 'Quarterly', value: 'Quarterly' },
            { label: 'Bi-Annually', value: 'Bi-Annually' },
            { label: 'Thricely', value: 'Thricely' },
            { label: 'Annually', value: 'Annually' },
            { label: 'Other', value: 'Other' },
          ]}
          value={publicationFrequency}
          onChange={(e) => setPublicationFrequency(e.target.value)}
          id="pubFreq"
        />
        <label htmlFor="pubFreq">Publication Frequency</label>
      </FloatingLabelContainer>
      <CheckboxContainer className="field-checkbox">
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
    </Container>
  );
});

export default Child;
