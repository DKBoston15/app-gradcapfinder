import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import {
  Container,
  ButtonContainer,
  CustomToolbar,
  SelectCalenderContainer,
  CustomCalendar,
  CustomSelect,
} from "./style";
import { useEntryFeedStore } from "@app/stores/entryFeedStore";

export default function NoteEditor({ connectedId }: any) {
  const addEntry = useEntryFeedStore((state: any) => state.addEntry);
  const [noteContent, setNoteContent] = useState<string | null>();
  const [category, setCategory] = useState("note");
  const [date, setDate] = useState(null);

  const addNote = async () => {
    if (noteContent) {
      await addEntry(category, noteContent, connectedId, date);
    } else {
      await addEntry(category, "<p></p>", connectedId, date);
    }
    setNoteContent("");
    setDate(null);
  };

  const categoryItems = [
    { label: "Note", value: "note" },
    { label: "Task", value: "task" },
  ];

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
          {/* <button type="button" className="ql-bold" aria-label="Bold"></button>
        <button
          type="button"
          className="ql-italic"
          aria-label="Italic"
        ></button> */}
          {/* <button
          type="button"
          className="ql-underline"
          aria-label="Underline"
        ></button> */}
        </span>
        <span className="ql-formats">
          <button
            type="button"
            className="ql-underline"
            aria-label="Underline"
          ></button>
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
          <button
            type="button"
            className="ql-list"
            value="ordered"
            aria-label="Ordered List"
          ></button>
          <button
            type="button"
            className="ql-list"
            value="bullet"
            aria-label="Unordered List"
          ></button>
          <select className="ql-align">
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>
        <span className="ql-formats">
          <button
            type="button"
            className="ql-link"
            aria-label="Insert Link"
          ></button>
          <button
            type="button"
            className="ql-image"
            aria-label="Insert Image"
          ></button>
          <button
            type="button"
            className="ql-code-block"
            aria-label="Insert Code Block"
          ></button>
        </span>
        <span className="ql-formats">
          <button
            type="button"
            className="ql-clean"
            aria-label="Remove Styles"
          ></button>
        </span>
      </div>
      <SelectCalenderContainer>
        {category === "task" && (
          <CustomCalendar
            placeholder="Set Due Date"
            showButtonBar
            value={date}
            // @ts-ignore
            onChange={(e) => setDate(e.value)}
          />
        )}

        <CustomSelect
          value={category}
          options={categoryItems}
          onChange={(e) => setCategory(e.value)}
        />
      </SelectCalenderContainer>
    </CustomToolbar>
  );

  return (
    <Container>
      <Editor
        style={{ height: "150px", maxWidth: "810px" }}
        // @ts-ignore
        value={noteContent}
        headerTemplate={header}
        onTextChange={(e) => setNoteContent(e.htmlValue)}
      />
      <ButtonContainer>
        <Button
          onClick={() => addNote()}
          disabled={noteContent ? false : true}
          className="p-button-sm"
        >
          Save
        </Button>
      </ButtonContainer>
    </Container>
  );
}
