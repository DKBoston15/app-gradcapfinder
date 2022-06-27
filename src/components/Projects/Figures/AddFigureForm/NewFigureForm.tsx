import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
} from './styles';
import { supabase } from '@app/supabase/index';
import { useFigureStore } from '@app/stores/figureStore';
import { Dropdown as DP } from 'primereact/dropdown';
import { useParams } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
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
    <Container>
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
    </Container>
  );
});

export default Child;
