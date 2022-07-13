import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { CustomInputText, FirstFloatingLabelContainer, FloatingLabelContainer } from './styles';
import { useFigureStore } from '@app/stores/figureStore';
import { Dropdown as DP } from 'primereact/dropdown';
import { useParams } from 'react-router-dom';
import { figureTypes } from '@app/constants';

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [type, setType] = useState(null);
  const [number, setNumber] = useState(null);
  const { projectId } = useParams();
  const addFigure = useFigureStore((state: any) => state.addFigure);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addFigure(title, link, type, number, projectId);
    },
  }));

  return (
    <div>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="title"
          // @ts-ignore
          value={title}
          // @ts-ignore
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title">Title</label>
      </FirstFloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="link"
          // @ts-ignore
          value={link}
          // @ts-ignore
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor="link">Link</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <DP
          id="figureType"
          options={figureTypes}
          value={type}
          style={{ width: '98%' }}
          onChange={(e) => {
            setType(e.value);
          }}
        />
        <label htmlFor="figureType">Type</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="figureNumber"
          // @ts-ignore
          value={number}
          // @ts-ignore
          onChange={(e) => setNumber(e.target.value)}
        />
        <label htmlFor="figureNumber">Number</label>
      </FloatingLabelContainer>
    </div>
  );
});

export default Child;
