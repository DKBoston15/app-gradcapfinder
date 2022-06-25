import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CustomDropdown,
} from './styles';
import { supabase } from '@app/supabase/index';
import { useResearchParadigmsStore } from '@app/stores/researchParadigmsStore';
import { useParams } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [category, setCategory] = useState('');
  const { projectId } = useParams();
  const addResearchParadigm = useResearchParadigmsStore((state: any) => state.addResearchParadigm);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addResearchParadigm(title, link, category, projectId);
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
        <CustomDropdown
          options={[
            { label: 'Quantitative', value: 'Quantitative' },
            { label: 'Qualitative', value: 'Qualitative' },
            { label: 'Mixed', value: 'Mixed' },
          ]}
          value={category}
          onChange={(e) => setCategory(e.value)}
          id="category"
        />
        <label htmlFor="category">Category</label>
      </FloatingLabelContainer>
    </Container>
  );
});

export default Child;
