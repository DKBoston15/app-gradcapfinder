import React, { useState, useEffect } from 'react';
import {
  NoteContainer,
  Icon,
  Container,
  ButtonContainer,
  IconContainer,
  CustomEditor,
  DateContainer,
} from './styles';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { Panel } from 'primereact/panel';
import './styles.css';

export default function Note({ entry }: any) {
  const patchEntry = useEntryFeedStore((state: any) => state.patchEntry);
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
        await patchEntry(entry.id, noteContent);
      } else {
        await patchEntry(entry.id, '<p></p>');
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

  const template = (options) => {
    const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
    const className = `${options.className} justify-content-start`;
    const titleClassName = `${options.titleClassName} pl-1`;
    const name = options.collapsed ? 'Collapsed Note' : 'Note';

    return (
      <div className={className}>
        <button className={options.togglerClassName} onClick={options.onTogglerClick}>
          <span className={toggleIcon}></span>
        </button>
        <span className={titleClassName}>{name}</span>
      </div>
    );
  };

  return (
    <Panel headerTemplate={template} toggleable id="notePanel">
      <NoteContainer>
        {!editing && (
          <>
            <IconContainer>
              <Icon onClick={() => deleteNote()} className="pi pi-trash" />
              <Icon onClick={() => setEditing(true)} className="pi pi-pencil" />
            </IconContainer>
            <CustomEditor
              // @ts-ignore
              value={entry.content}
              headerTemplate={header}
              readOnly
            />
            <DateContainer>Created: {entry.created_at.slice(0, 10)}</DateContainer>
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
    </Panel>
  );
}
