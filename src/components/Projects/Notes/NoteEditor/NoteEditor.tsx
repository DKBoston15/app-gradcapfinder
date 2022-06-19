import React, { useState } from 'react';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Container, ButtonContainer, CustomToolbar } from './styles';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { useProjectStore } from '@app/stores/projectStore';
import { useLocation } from 'react-router-dom';

export default function NoteEditor({ connectedId, personal }: any) {
  const location = useLocation();
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const addEntry = useEntryFeedStore((state: any) => state.addEntry);
  const [noteContent, setNoteContent] = useState<string | null>();

  const addNote = async () => {
    const section = location.pathname.replace('/projects/', '');
    if (noteContent) {
      if (personal) {
        await addEntry('task', noteContent, null, null, 'personal');
      } else {
        await addEntry('note', noteContent, connectedId, selectedProject, section);
      }
    } else {
      if (personal) {
        await addEntry('task', '<p></p>', null, null, 'personal');
      } else {
        await addEntry('note', '<p></p>', connectedId, selectedProject, section);
      }
    }
    setNoteContent('');
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
          <button
            type="button"
            className="ql-list"
            value="ordered"
            aria-label="Ordered List"></button>
          <button
            type="button"
            className="ql-list"
            value="bullet"
            aria-label="Unordered List"></button>
          <select className="ql-align">
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-link" aria-label="Insert Link"></button>
          <button type="button" className="ql-code-block" aria-label="Insert Code Block"></button>
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-clean" aria-label="Remove Styles"></button>
        </span>
      </div>
    </CustomToolbar>
  );

  return (
    <Container className="literatureNoteEditor">
      <Editor
        style={{ height: '150px', maxWidth: '810px' }}
        // @ts-ignore
        value={noteContent}
        headerTemplate={header}
        onTextChange={(e) => setNoteContent(e.htmlValue)}
      />
      <ButtonContainer>
        <Button
          onClick={() => addNote()}
          disabled={noteContent ? false : true}
          className="p-button-sm">
          Save
        </Button>
      </ButtonContainer>
    </Container>
  );
}
