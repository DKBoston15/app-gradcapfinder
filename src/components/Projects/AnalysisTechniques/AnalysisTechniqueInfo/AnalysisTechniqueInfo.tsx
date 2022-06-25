import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer } from './styles';
import { useAnalysisTechniquesStore } from '../../../../stores/analysisTechniquesStore';
import { Dropdown as DP } from 'primereact/dropdown';

export default function AnalysisTechniqueInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const patchAnalysisTechnique = useAnalysisTechniquesStore(
    (state: any) => state.patchAnalysisTechnique,
  );
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [technique, setTechnique] = useState('');
  const [method, setMethod] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setTechnique(selectedItem.technique);
      setMethod(selectedItem.method);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await patchAnalysisTechnique(selectedItem.id, title, link, technique, method);
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
                  paddingBottom: '0.2em',
                  marginLeft: '1em',
                  cursor: 'pointer',
                }}
              />
            </LinkContainer>
            <CustomInput className="p-float-label">
              <DP
                id="technique"
                options={[
                  { label: 'Qualitative', value: 'Qualitative' },
                  { label: 'Quantitative', value: 'Quantitative' },
                  { label: 'Textual', value: 'Textual' },
                  { label: 'Statistical', value: 'Statistical' },
                  { label: 'Diagnostic', value: 'Diagnostic' },
                  { label: 'Predictive', value: 'Predictive' },
                  { label: 'Prescriptive', value: 'Prescriptive' },
                  { label: 'Other', value: 'Other' },
                ]}
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
                value={method}
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
