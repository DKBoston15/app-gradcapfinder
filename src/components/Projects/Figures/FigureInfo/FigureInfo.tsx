import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput } from './styles';
import { useFigureStore } from '../../../../stores/figureStore';
import { Dropdown as DP } from 'primereact/dropdown';

export default function FigureInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const editFigure = useFigureStore((state: any) => state.editFigure);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setType(selectedItem.type);
      setNumber(selectedItem.number);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await editFigure(selectedItem.id, title, link, type, number);
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
                id="figureType"
                options={[
                  { label: 'Line Graph', value: 'Line Graph' },
                  { label: 'Bar Graph', value: 'Bar Graph' },
                  { label: 'Charts', value: 'Charts' },
                  { label: 'Drawings', value: 'Drawings' },
                  { label: 'Maps', value: 'Maps' },
                  { label: 'Plots', value: 'Plots' },
                  { label: 'Photographs', value: 'Photographs' },
                  { label: 'Other', value: 'Other' },
                ]}
                value={type}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setType(e.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="figureType">Type</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="figureNumber"
                value={number}
                onChange={(e) => {
                  // @ts-ignore
                  setNumber(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="figureNumber">Number</label>
            </CustomInput>
          </div>
        </div>
      )}
    </>
  );
}
