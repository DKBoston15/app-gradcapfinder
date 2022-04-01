import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput } from './styles';
import { useFigureStore } from '../../../../stores/figureStore';

export default function FigureInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const editFigure = useFigureStore((state: any) => state.editFigure);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await editFigure(selectedItem.id, title, link);
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
          </div>
        </div>
      )}
    </>
  );
}
