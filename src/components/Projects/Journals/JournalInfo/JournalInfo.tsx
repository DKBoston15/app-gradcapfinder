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

export default function JournalInfo({ setSelectedItem, selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const editJournal = useJournalStore((state: any) => state.editJournal);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [impactScore, setImpactScore] = useState('');
  const [editor, setEditor] = useState('');
  const [publicationFrequency, setPublicationFrequency] = useState('');
  const [association, setAssociation] = useState('');
  const [primary, setPrimary] = useState(false);

  useEffect(() => {
    if (selectedItem.title && selectedItem.title != title) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setImpactScore(selectedItem.impact_score);
      setEditor(selectedItem.editor);
      setPublicationFrequency(selectedItem.publication_freq);
      setAssociation(selectedItem.association);
      setPrimary(selectedItem.primary);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await editJournal(
      selectedItem.id,
      title,
      link,
      impactScore,
      editor,
      publicationFrequency,
      association,
      primary,
    );
    setTimeout(() => {
      setSaving(false);
    }, 500);
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
                value={title}
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
                value={impactScore}
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
                value={editor}
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
                value={association}
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
              options={[
                { label: 'Monthly', value: 'Monthly' },
                { label: 'Bi-Monthly', value: 'Bi-Monthly' },
                { label: 'Quarterly', value: 'Quarterly' },
                { label: 'Bi-Annually', value: 'Bi-Annually' },
                { label: 'Thricely', value: 'Thricely' },
                { label: 'Annually', value: 'Annually' },
                { label: 'Other', value: 'Other' },
              ]}
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
                  value={link}
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
                  setSelectedItem((current) => ({
                    ...current,
                    primary: e.checked ? true : false,
                  }));
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
