import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput } from './styles';
import { useModelsStore } from '../../../../stores/modelsStore';
import { Dropdown as DP } from 'primereact/dropdown';

export default function ModelInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const editModel = useModelsStore((state: any) => state.editModel);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setType(selectedItem.type);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await editModel(selectedItem.id, title, link, type);
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
