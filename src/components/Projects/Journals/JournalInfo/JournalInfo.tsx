import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import {
  CustomInput,
  LinkInput,
  CustomDropdown,
  LinkContainer,
  CheckboxContainer,
  CheckboxLabel,
} from './styles';
import { useJournalStore } from '../../../../stores/journalStore';
import { Checkbox } from 'primereact/checkbox';
import './styles.css';
import { useParams } from 'react-router-dom';
import { journalPublicationFrequencyOptions } from '@app/constants';

export default function JournalInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [impactScore, setImpactScore] = useState('');
  const [editor, setEditor] = useState('');
  const [publicationFrequency, setPublicationFrequency] = useState('');
  const [association, setAssociation] = useState('');
  const [primary, setPrimary] = useState(false);

  const { journals, patchJournal } = useJournalStore((state) => ({
    journals: state.journals,
    patchJournal: state.patchJournal,
  }));

  const { id } = useParams();

  useEffect(() => {
    const newSelectedItem = journals.filter((journal) => journal.id == selectedItem);
    if (newSelectedItem) {
      if (newSelectedItem[0].title && newSelectedItem[0].title != title) {
        setTitle(newSelectedItem[0].title);
        setLink(newSelectedItem[0].link);
        setImpactScore(newSelectedItem[0].impact_score);
        setEditor(newSelectedItem[0].editor);
        setPublicationFrequency(newSelectedItem[0].publication_freq);
        setAssociation(newSelectedItem[0].association);
        setPrimary(newSelectedItem[0].primary);
        setLoading(false);
      }
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    await patchJournal(
      id,
      title,
      link,
      impactScore,
      editor,
      publicationFrequency,
      association,
      primary,
    );
  }, 1500);

  return (
    <>
      {selectedItem && !loading && (
        <div>
          <div>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="title"
                value={title || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setTitle(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="title">Title</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="impactScore"
                // @ts-ignore
                value={impactScore || ''}
                // @ts-ignore
                onChange={(e) => {
                  // @ts-ignore
                  setImpactScore(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="impactScore">Impact Score</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="editor"
                // @ts-ignore
                value={editor || ''}
                // @ts-ignore
                onChange={(e) => {
                  // @ts-ignore
                  setEditor(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="editor">Editor</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="association"
                // @ts-ignore
                value={association || ''}
                // @ts-ignore
                onChange={(e) => {
                  // @ts-ignore
                  setAssociation(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="association">Association</label>
            </CustomInput>
            <CustomDropdown
              id="pubFreq"
              value={publicationFrequency}
              options={journalPublicationFrequencyOptions}
              onChange={(e) => {
                // @ts-ignore
                setPublicationFrequency(e.target.value);
                debouncedUpdate();
              }}
              optionLabel="value"
              filter
              showClear
              filterBy="label"
              placeholder="Select a Frequency"
            />
            <LinkContainer>
              <LinkInput className="p-float-label">
                <InputText
                  style={{ width: '100%' }}
                  id="link"
                  value={link || ''}
                  onChange={(e) => {
                    // @ts-ignore
                    setLink(e.target.value);
                    debouncedUpdate();
                  }}
                />
                <label htmlFor="link">Link</label>
              </LinkInput>
              <i
                className="pi pi-external-link"
                onClick={() => window.open(link, '_blank')}
                style={{
                  fontSize: '1.5em',
                  paddingBottom: '0.2em',
                  marginLeft: '1em',
                  cursor: 'pointer',
                }}
              />
            </LinkContainer>
            <CheckboxContainer className="field-checkbox">
              <Checkbox
                inputId="primary"
                checked={primary}
                onChange={(e) => {
                  // @ts-ignore
                  setPrimary(e.checked);
                  debouncedUpdate();
                }}
              />
              <CheckboxLabel htmlFor="primary">Primary Journal?</CheckboxLabel>
            </CheckboxContainer>
          </div>
        </div>
      )}
    </>
  );
}
