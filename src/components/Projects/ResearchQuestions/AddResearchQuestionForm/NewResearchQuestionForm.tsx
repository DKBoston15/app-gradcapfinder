import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { CustomInputText, FirstFloatingLabelContainer, FloatingLabelContainer } from './styles';
import { useResearchQuestionsStore } from '@app/stores/researchQuestionsStore';
import { useParams } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const { projectId } = useParams();
  const addResearchQuestion = useResearchQuestionsStore((state: any) => state.addResearchQuestion);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addResearchQuestion(title, link, projectId);
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
    </div>
  );
});

export default Child;
