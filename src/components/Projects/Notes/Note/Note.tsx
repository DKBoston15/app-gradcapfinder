import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import {
  NoteContainer,
  Icon,
  Container,
  ButtonContainer,
  IconContainer,
  CustomEditor,
} from './styles';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import ReactMarkdown from 'react-markdown';

export default function Note({ entry }: any) {
  const editEntry = useEntryFeedStore((state: any) => state.editEntry);
  const deleteEntry = useEntryFeedStore((state: any) => state.deleteEntry);
  const [editing, setEditing] = useState(false);
  const [noteContent, setNoteContent] = useState<string | null>(entry.content);

  useEffect(() => {
    setNoteContent(entry.content);
  }, [entry]);

  const editNote = () => {
    setEditing(false);
    const makeUpdate = async () => {
      if (noteContent) {
        await editEntry(entry.id, noteContent);
      } else {
        await editEntry(entry.id, '<p></p>');
      }

      setNoteContent('');
    };
    makeUpdate();
  };

  const deleteNote = () => {
    const makeUpdate = async () => {
      await deleteEntry(entry.id);
    };
    makeUpdate();
  };

  const renderHeader = () => {
    return <span />;
  };

  const header = renderHeader();

  const style = {
    '.p-editor-toolbar .ql-toolbar .ql-snow': {
      display: 'none',
    },
  };

  return (
    <NoteContainer>
      {!editing && (
        <>
          <IconContainer>
            <Icon onClick={() => deleteNote()} className="pi pi-trash" />
            <Icon onClick={() => setEditing(true)} className="pi pi-pencil" />
          </IconContainer>
          {/* <div>{parse(entry.content)}</div> */}
          <CustomEditor
            // @ts-ignore
            value={entry.content}
            headerTemplate={header}
            readOnly={true}
          />
        </>
      )}
      {editing && (
        <Container>
          <Editor
            style={{ height: '150px' }}
            // @ts-ignore
            value={entry.content}
            onTextChange={(e) => setNoteContent(e.htmlValue)}
          />
          <ButtonContainer>
            <Button onClick={() => editNote()} className="p-button-sm">
              Save
            </Button>
          </ButtonContainer>
        </Container>
      )}
    </NoteContainer>
  );
}
