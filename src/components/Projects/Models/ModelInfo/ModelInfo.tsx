import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer } from './styles';
import { useModelsStore } from '../../../../stores/modelsStore';
import { Dropdown as DP } from 'primereact/dropdown';
import './styles.css';
import { useParams } from 'react-router-dom';
export default function ModelInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState('');

  const { models, patchModel } = useModelsStore((state) => ({
    models: state.models,
    patchModel: state.patchModel,
  }));

  const { id } = useParams();

  useEffect(() => {
    const newSelectedItem = models.filter((model) => model.id == selectedItem);
    if (newSelectedItem) {
      setTitle(newSelectedItem[0].title);
      setLink(newSelectedItem[0].link);
      setType(newSelectedItem[0].type);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    // setSaving(true);
    await patchModel(id, title, link, type);
    // setTimeout(() => {
    //   setSaving(false);
    // }, 500);
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
                id="type"
                options={[
                  { label: 'Empirical', value: 'Empirical' },
                  { label: 'Conceptual', value: 'Conceptual' },
                  { label: 'Theoretical', value: 'Theoretical' },
                  { label: 'Other', value: 'Other' },
                ]}
                value={type}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setType(e.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="type">Type</label>
            </CustomInput>
          </div>
        </div>
      )}
    </>
  );
}
