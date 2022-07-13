import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CustomDropdown,
} from './styles';
import { useResearchParadigmsStore } from '@app/stores/researchParadigmsStore';
import { useParams } from 'react-router-dom';
import { researchParadigmOptions } from '@app/constants';

const Child = forwardRef((props, ref) => {
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
        <CustomDropdown
          options={researchParadigmOptions}
          value={category}
          onChange={(e) => setCategory(e.value)}
          id="category"
        />
        <label htmlFor="category">Category</label>
      </FloatingLabelContainer>
    </div>
  );
});

export default Child;
