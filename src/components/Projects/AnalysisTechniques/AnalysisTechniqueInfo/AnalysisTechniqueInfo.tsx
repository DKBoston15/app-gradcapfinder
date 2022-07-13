import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer } from './styles';
import { useAnalysisTechniquesStore } from '../../../../stores/analysisTechniquesStore';
import { Dropdown as DP } from 'primereact/dropdown';
import './styles.css';
import { useParams } from 'react-router-dom';
import { analysisTechniqueOptions } from '@app/constants';

export default function AnalysisTechniqueInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const { analysis_techniques, patchAnalysisTechnique } = useAnalysisTechniquesStore((state) => ({
    analysis_techniques: state.analysis_techniques,
    patchAnalysisTechnique: state.patchAnalysisTechnique,
  }));

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [technique, setTechnique] = useState('');
  const [method, setMethod] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const newSelectedItem = analysis_techniques.filter(
      (analysis_technique) => analysis_technique.id == selectedItem,
    );
    if (newSelectedItem.length > 0) {
      setTitle(newSelectedItem[0].title);
      setLink(newSelectedItem[0].link);
      setTechnique(newSelectedItem[0].technique);
      setMethod(newSelectedItem[0].method);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    await patchAnalysisTechnique(id, title, link, technique, method);
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
                id="technique"
                options={analysisTechniqueOptions}
                value={technique}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setTechnique(e.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="technique">Technique</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="method"
                value={method || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setMethod(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="method">Method</label>
            </CustomInput>
          </div>
        </div>
      )}
    </>
  );
}
