import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
} from './styles';
import { supabase } from '@app/supabase/index';
import { useProjectStore } from '@app/stores/projectStore';
import { useAnalysisTechniquesStore } from '@app/stores/analysisTechniquesStore';
import { Dropdown as DP } from 'primereact/dropdown';

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [technique, setTechnique] = useState('');
  const [method, setMethod] = useState('');

  const getAnalysisTechniques = useAnalysisTechniquesStore(
    (state: any) => state.getAnalysisTechniques,
  );
  const addAnalysisTechnique = useAnalysisTechniquesStore(
    (state: any) => state.addAnalysisTechnique,
  );
  const selectedProject = useProjectStore((state: any) => state.selectedProject);

  useEffect(() => {
    const getData = async () => {
      const data = await getAnalysisTechniques(selectedProject);
    };
    getData();
  }, []);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addAnalysisTechnique(title, link, technique, method, selectedProject);
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
          id="technique"
          options={[
            { label: 'Qualitative', value: 'Qualitative' },
            { label: 'Quantitative', value: 'Quantitative' },
            { label: 'Textual', value: 'Textual' },
            { label: 'Statistical', value: 'Statistical' },
            { label: 'Diagnostic', value: 'Diagnostic' },
            { label: 'Predictive', value: 'Predictive' },
            { label: 'Prescriptive', value: 'Prescriptive' },
            { label: 'Other', value: 'Other' },
          ]}
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
    </Container>
  );
});

export default Child;
