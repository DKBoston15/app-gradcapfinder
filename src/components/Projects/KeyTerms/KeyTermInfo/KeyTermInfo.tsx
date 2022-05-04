import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput } from './styles';
import { useKeyTermStore } from '../../../../stores/keytermStore';

export default function KeyTermInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const editKeyTerm = useKeyTermStore((state: any) => state.editKeyTerm);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [citations, setCitations] = useState('');
  const [keyArticle, setKeyArticle] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setCitations(selectedItem.citations);
      setKeyArticle(selectedItem.key_article);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await editKeyTerm(selectedItem.id, title, link, citations, keyArticle);
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
