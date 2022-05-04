import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput } from './styles';
import { useJournalStore } from '../../../../stores/journalStore';

export default function JournalInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const editJournal = useJournalStore((state: any) => state.editJournal);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [impactScore, setImpactScore] = useState('');
  const [editor, setEditor] = useState('');
  const [publicationFrequency, setPublicationFrequency] = useState('');
  const [association, setAssociation] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setImpactScore(selectedItem.impact_score);
      setEditor(selectedItem.editor);
      setPublicationFrequency(selectedItem.publication_freq);
      setAssociation(selectedItem.association);
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
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="pubFreq"
                // @ts-ignore
                value={publicationFrequency}
                // @ts-ignore
                onChange={(e) => {
                  // @ts-ignore
                  setPublicationFrequency(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="pubFreq">Publication Frequency</label>
            </CustomInput>
            <LinkInput className="p-float-label">
              <InputText
                id="link"
                value={link}
                style={{ width: '100%' }}
                onChange={(e) => {
                  // @ts-ignore
                  setLink(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="link">Link</label>
            </LinkInput>
          </div>
        </div>
      )}
    </>
  );
}
