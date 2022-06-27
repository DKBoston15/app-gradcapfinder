import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer, CheckboxContainer, CheckboxLabel } from './styles';
import { useKeyTermStore } from '../../../../stores/keytermStore';
import { Checkbox } from 'primereact/checkbox';

export default function KeyTermInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const patchKeyTerm = useKeyTermStore((state: any) => state.patchKeyTerm);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [citations, setCitations] = useState('');
  const [keyLiterature, setKeyLiterature] = useState('');
  const [primary, setPrimary] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.name && selectedItem.name != name) {
        setName(selectedItem.name);
        setLink(selectedItem.link);
        setCitations(selectedItem.citations);
        setKeyLiterature(selectedItem.key_literature);
        setPrimary(selectedItem.primary);
        setLoading(false);
      }
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await patchKeyTerm(selectedItem.id, name, link, citations, keyLiterature, primary);
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
                id="name"
                value={name}
                onChange={(e) => {
                  // @ts-ignore
                  setName(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="name">Name</label>
            </CustomInput>
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
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="citations"
                value={citations}
                onChange={(e) => {
                  // @ts-ignore
                  setCitations(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="citations">Google Scholar Citations</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="keyLiterature"
                value={keyLiterature}
                onChange={(e) => {
                  // @ts-ignore
                  setKeyLiterature(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="keyLiterature">Key Literature</label>
            </CustomInput>
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
              <CheckboxLabel htmlFor="primary">Primary Key Term?</CheckboxLabel>
            </CheckboxContainer>
          </div>
        </div>
      )}
    </>
  );
}
