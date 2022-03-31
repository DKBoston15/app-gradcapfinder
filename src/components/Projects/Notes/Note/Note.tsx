import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { NoteContainer, Icon, Container, ButtonContainer, IconContainer } from './styles';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';

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

  return (
    <NoteContainer>
      {!editing && (
        <>
          <IconContainer>
            <Icon onClick={() => deleteNote()} className="pi pi-trash" />
            <Icon onClick={() => setEditing(true)} className="pi pi-pencil" />
          </IconContainer>
          <div>{parse(entry.content)}</div>
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