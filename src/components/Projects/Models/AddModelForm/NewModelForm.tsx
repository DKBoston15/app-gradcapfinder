import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
} from './styles';
import { supabase } from '@app/supabase/index';
import { useModelsStore } from '@app/stores/modelsStore';
import { Dropdown as DP } from 'primereact/dropdown';
import { useParams } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [type, setType] = useState('');
  const { projectId } = useParams();
  const addModel = useModelsStore((state: any) => state.addModel);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addModel(title, link, type, projectId);
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
          id="type"
          options={[
            { label: 'Empirical', value: 'Empirical' },
            { label: 'Conceptual', value: 'Conceptual' },
            { label: 'Theoretical', value: 'Theoretical' },
            { label: 'Other', value: 'Other' },
          ]}
          value={type}
          style={{ width: '98%' }}
          onChange={(e) => {
            setType(e.value);
          }}
        />
        <label htmlFor="type">Type</label>
      </FloatingLabelContainer>
    </Container>
  );
});

export default Child;
