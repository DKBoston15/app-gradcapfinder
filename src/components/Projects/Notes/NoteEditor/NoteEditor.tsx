import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { Container, ButtonContainer } from "./style";
import { useEntryFeedStore } from "@app/stores/entryFeedStore";

export default function NoteEditor({ connectedId }: any) {
  const addEntry = useEntryFeedStore((state: any) => state.addEntry);
  const [noteContent, setNoteContent] = useState<string | null>();

  const addNote = async () => {
    await addEntry("Note", noteContent, connectedId);
    setNoteContent("");
  };

  return (
    <Container>
      <Editor
        style={{ height: "150px" }}
        // @ts-ignore
        value={noteContent}
        onTextChange={(e) => setNoteContent(e.htmlValue)}
      />
      <ButtonContainer>
        <Button onClick={() => addNote()} className="p-button-sm">
          Save
        </Button>
      </ButtonContainer>
    </Container>
  );
}
