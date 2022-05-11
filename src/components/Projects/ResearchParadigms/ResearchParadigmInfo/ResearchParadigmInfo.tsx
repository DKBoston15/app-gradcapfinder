import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer } from './styles';
import { useResearchParadigmsStore } from '../../../../stores/researchParadigmsStore';
import { Dropdown as DP } from 'primereact/dropdown';

export default function ResearchParadigmInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const editResearchParadigm = useResearchParadigmsStore(
    (state: any) => state.editResearchParadigm,
  );
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setCategory(selectedItem.category);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await editResearchParadigm(selectedItem.id, title, link, category);
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
                  paddingBottom: '0.6em',
                  marginLeft: '1em',
                  cursor: 'pointer',
                }}
              />
            </LinkContainer>
            <CustomInput className="p-float-label">
              <DP
                id="category"
                options={[
                  { label: 'Quantitative', value: 'Quantitative' },
                  { label: 'Qualitative', value: 'Qualitative' },
                  { label: 'Mixed', value: 'Mixed' },
                ]}
                value={category}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setCategory(e.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="category">Category</label>
            </CustomInput>
          </div>
        </div>
      )}
    </>
  );
}
