import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CheckboxContainer,
  CheckboxLabel,
} from './styles';
import { useKeyTermStore } from '@app/stores/keytermStore';
import { Checkbox } from 'primereact/checkbox';
import { useParams } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const [name, setName] = useState(null);
  const [link, setLink] = useState(null);
  const [label, setLabel] = useState('');
  const [keyLiterature, setKeyLiterature] = useState('');
  const [primary, setPrimary] = useState(false);
  const [primaryCount, setPrimaryCount] = useState(0);
  const { projectId } = useParams();

  const { keyTerms, addKeyTerm } = useKeyTermStore((state) => ({
    keyTerms: state.keyTerms,
    addKeyTerm: state.addKeyTerm,
  }));

  useEffect(() => {
    const getData = async () => {
      const projectPeople = keyTerms.filter((keyTerm) => keyTerm.project_id == projectId);
      let extractedValue = projectPeople.map((item: any) => item.primary);
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
        name,
        link,
        label,
        keyLiterature,
        // @ts-ignore
        props.connectedEntity,
        primary,
        projectId,
      );
    },
  }));

  return (
    <div>
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
          id="label"
          // @ts-ignore
          value={label}
          // @ts-ignore
          onChange={(e) => setLabel(e.target.value)}
        />
        <label htmlFor="label">Google Scholar Label</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="keyLiterature"
          // @ts-ignore
          value={keyLiterature}
          // @ts-ignore
          onChange={(e) => setKeyLiterature(e.target.value)}
        />
        <label htmlFor="keyLiterature">Key Literature</label>
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
    </div>
  );
});

export default Child;
