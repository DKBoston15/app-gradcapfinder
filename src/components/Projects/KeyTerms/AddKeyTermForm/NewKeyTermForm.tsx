import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CheckboxContainer,
  CheckboxLabel,
} from './styles';
import { supabase } from '@app/supabase/index';
import { useProjectStore } from '@app/stores/projectStore';
import { useKeyTermStore } from '@app/stores/keytermStore';
import { Checkbox } from 'primereact/checkbox';

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
  const [name, setName] = useState(null);
  const [link, setLink] = useState(null);
  const [citations, setCitations] = useState('');
  const [keyArticle, setKeyArticle] = useState('');
  const [primary, setPrimary] = useState(false);
  const [primaryCount, setPrimaryCount] = useState(0);

  const getKeyTerms = useKeyTermStore((state: any) => state.getKeyTerms);
  const addKeyTerm = useKeyTermStore((state: any) => state.addKeyTerm);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);

  useEffect(() => {
    const getData = async () => {
      const data = await getKeyTerms(selectedProject);
      let extractedValue = data.map((item: any) => item.primary);
      let count = 0;
      for (let primaryValue = 0; primaryValue < extractedValue.length; primaryValue++) {
        if (extractedValue[primaryValue]) {
          count++;
        }
      }
      setPrimaryCount(count);
    };
    getData();
  }, []);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addKeyTerm(
        user?.id,
        name,
        link,
        citations,
        keyArticle,
        // @ts-ignore
        props.connectedEntity,
        primary,
        selectedProject,
      );
    },
  }));

  return (
    <Container>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="name"
          // @ts-ignore
          value={name}
          // @ts-ignore
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="name">Name</label>
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
        <CustomInputText
          id="citations"
          // @ts-ignore
          value={citations}
          // @ts-ignore
          onChange={(e) => setCitations(e.target.value)}
        />
        <label htmlFor="citations">Google Scholar Citations</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="keyArticle"
          // @ts-ignore
          value={keyArticle}
          // @ts-ignore
          onChange={(e) => setKeyArticle(e.target.value)}
        />
        <label htmlFor="keyArticle">Key Article</label>
      </FloatingLabelContainer>
      <CheckboxContainer className="field-checkbox">
        <Checkbox
          disabled={primaryCount >= 7 ? true : false}
          tooltip="This project already has a max of 7 key terms set as a primary key term"
          tooltipOptions={{ disabled: primaryCount >= 7 ? false : true }}
          inputId="primary"
          checked={primary}
          onChange={(e) => setPrimary(e.checked)}
        />
        <CheckboxLabel htmlFor="primary">Primary Key Term?</CheckboxLabel>
      </CheckboxContainer>
    </Container>
  );
});

export default Child;
