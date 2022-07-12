import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { CustomInputText, FirstFloatingLabelContainer, FloatingLabelContainer } from './styles';
import { useAnalysisTechniquesStore } from '@app/stores/analysisTechniquesStore';
import { Dropdown as DP } from 'primereact/dropdown';
import { useParams } from 'react-router-dom';
import { analysisTechniqueOptions } from '@app/constants';

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [technique, setTechnique] = useState('');
  const [method, setMethod] = useState('');
  const { projectId } = useParams();
  const addAnalysisTechnique = useAnalysisTechniquesStore(
    (state: any) => state.addAnalysisTechnique,
  );

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addAnalysisTechnique(title, link, technique, method, projectId);
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
          id="technique"
          options={analysisTechniqueOptions}
          value={technique}
          style={{ width: '98%' }}
          onChange={(e) => {
            setTechnique(e.value);
          }}
        />
        <label htmlFor="technique">Technique</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="method"
          value={method}
          onChange={(e) => {
            // @ts-ignore
            setMethod(e.target.value);
          }}
        />
        <label htmlFor="method">Method</label>
      </FloatingLabelContainer>
    </div>
  );
});

export default Child;
