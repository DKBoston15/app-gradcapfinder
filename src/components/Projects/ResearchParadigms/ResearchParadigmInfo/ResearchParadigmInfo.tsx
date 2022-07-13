import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer } from './styles';
import { useResearchParadigmsStore } from '../../../../stores/researchParadigmsStore';
import { Dropdown as DP } from 'primereact/dropdown';
import './styles.css';
import { useParams } from 'react-router-dom';
import { researchParadigmOptions } from '@app/constants';

export default function ResearchParadigmInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const { research_paradigms, patchResearchParadigm } = useResearchParadigmsStore((state) => ({
    research_paradigms: state.research_paradigms,
    patchResearchParadigm: state.patchResearchParadigm,
  }));
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');
  const { id } = useParams();
  useEffect(() => {
    const newSelectedItem = research_paradigms.filter(
      (research_paradigm) => research_paradigm.id == selectedItem,
    );
    if (newSelectedItem.length > 0) {
      setTitle(newSelectedItem[0].title);
      setLink(newSelectedItem[0].link);
      setCategory(newSelectedItem[0].category);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    await patchResearchParadigm(id, title, link, category);
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
              <DP
                id="category"
                options={researchParadigmOptions}
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
