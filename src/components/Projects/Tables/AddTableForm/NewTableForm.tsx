import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { CustomInputText, FirstFloatingLabelContainer, FloatingLabelContainer } from './styles';
import { useTablesStore } from '@app/stores/tablesStore';
import { useParams } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const { projectId } = useParams();
  const addTable = useTablesStore((state: any) => state.addTable);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addTable(title, link, projectId);
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
