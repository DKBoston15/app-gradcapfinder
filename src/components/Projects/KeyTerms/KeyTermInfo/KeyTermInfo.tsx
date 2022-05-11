import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer } from './styles';
import { useKeyTermStore } from '../../../../stores/keytermStore';

export default function KeyTermInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const editKeyTerm = useKeyTermStore((state: any) => state.editKeyTerm);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [citations, setCitations] = useState('');
  const [keyArticle, setKeyArticle] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.title);
      setLink(selectedItem.link);
      setCitations(selectedItem.citations);
      setKeyArticle(selectedItem.key_article);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await editKeyTerm(selectedItem.id, name, link, citations, keyArticle);
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
                id="keyArticle"
                value={keyArticle}
                onChange={(e) => {
                  // @ts-ignore
                  setKeyArticle(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="keyArticle">Key Article</label>
            </CustomInput>
          </div>
        </div>
      )}
    </>
  );
}
