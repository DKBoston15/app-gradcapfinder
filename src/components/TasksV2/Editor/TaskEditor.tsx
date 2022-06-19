import React, { useState } from 'react';
import { Editor } from 'primereact/editor';
import {
  CustomEditor,
  Container,
  ButtonContainer,
  CustomToolbar,
  ReadonlyContainer,
  CustomButton,
} from './editor.styles';
import useTaskStore from '@app/stores/tasksv2Store';

export default function TaskEditor({ content, id }) {
  const [editing, setEditing] = useState(false);
  const patchContent = useTaskStore((state) => state.patchContent);
  const [newContent, setNewContent] = useState(content);
  const renderCustomHeader = () => {
    return <span />;
  };

  const editTask = () => {
    patchContent(id, newContent);
    setEditing(false);
  };

  const header = (
    <CustomToolbar>
      <div>
        <span className="ql-formats">
          <select className="ql-header" defaultValue="0">
            <option value="1">Heading</option>
            <option value="2">Subheading</option>
            <option value="0">Normal</option>
          </select>
          <select className="ql-font">
            <option value="sans-serif"></option>
            <option value="serif"></option>
            <option value="monospace"></option>
          </select>
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-bold" aria-label="Bold" />
          <button type="button" className="ql-italic" aria-label="Italic" />
          <button type="button" className="ql-underline" aria-label="Underline" />
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-underline" aria-label="Underline"></button>
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-list" value="ordered" aria-label="Ordered List" />
          <button type="button" className="ql-list" value="bullet" aria-label="Unordered List" />
          <select className="ql-align">
            <option value="center" />
            <option value="right" />
            <option value="justify" />
          </select>
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-link" aria-label="Insert Link" />
          <button type="button" className="ql-image" aria-label="Insert Image" />
          <button type="button" className="ql-code-block" aria-label="Insert Code Block" />
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-clean" aria-label="Remove Styles" />
        </span>
      </div>
    </CustomToolbar>
  );

  const customHeader = renderCustomHeader();

  return (
    <>
      {!editing && (
        <ReadonlyContainer>
          <CustomEditor
            // value={entry.content}
            value={content}
            headerTemplate={customHeader}
            readOnly={true}
          />
          <CustomButton onClick={() => setEditing(!editing)}>Edit</CustomButton>
        </ReadonlyContainer>
      )}

      {editing && (
        <Container>
          <Editor
            style={{ height: '150px' }}
            // @ts-ignore
            value={content}
            headerTemplate={header}
            onTextChange={(e) => {
              setNewContent(e.htmlValue);
            }}
          />
          <ButtonContainer>
            <CustomButton onClick={() => editTask()} className="p-button-sm">
              Save
            </CustomButton>
          </ButtonContainer>
        </Container>
      )}
    </>
  );
}
