import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer, CheckboxContainer, CheckboxLabel } from './styles';
import { useKeyTermStore } from '../../../../stores/keytermStore';
import { Checkbox } from 'primereact/checkbox';
import './styles.css';
import { useParams } from 'react-router-dom';

export default function KeyTermInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [label, setLabel] = useState('');
  const [keyLiterature, setKeyLiterature] = useState('');
  const [primary, setPrimary] = useState(false);

  const { id } = useParams();

  const { keyTerms, patchKeyTerm } = useKeyTermStore((state) => ({
    keyTerms: state.keyTerms,
    patchKeyTerm: state.patchKeyTerm,
  }));

  useEffect(() => {
    const newSelectedItem = keyTerms.filter((keyterm) => keyterm.id == selectedItem);
    if (newSelectedItem) {
      if (newSelectedItem[0].name && newSelectedItem[0].name != name) {
        setName(newSelectedItem[0].name);
        setLink(newSelectedItem[0].link);
        setLabel(newSelectedItem[0].citations);
        setKeyLiterature(newSelectedItem[0].key_literature);
        setPrimary(newSelectedItem[0].primary);
        setLoading(false);
      }
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    await patchKeyTerm(id, name, link, label, keyLiterature, primary);
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
                value={name || ''}
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
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="label"
                value={label || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setLabel(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="label">Google Scholar Label</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="keyLiterature"
                value={keyLiterature || ''}
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
