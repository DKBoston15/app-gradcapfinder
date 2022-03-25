import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import {
  NoteContainer,
  Icon,
  Container,
  ButtonContainer,
  IconContainer,
} from "./style";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { useEntryFeedStore } from "@app/stores/entryFeedStore";

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
      await editEntry(entry.id, noteContent);
      setNoteContent("");
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
          <div>{parse(entry.content)}</div>
          <IconContainer>
            <Icon onClick={() => deleteNote()} className="pi pi-trash" />
            <Icon onClick={() => setEditing(true)} className="pi pi-pencil" />
          </IconContainer>
        </>
      )}
      {editing && (
        <Container>
          <Editor
            style={{ height: "150px" }}
            // @ts-ignore
            value={noteContent}
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
