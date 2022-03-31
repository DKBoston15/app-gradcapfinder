import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import {
  TaskContainer,
  Icon,
  Container,
  ButtonContainer,
  IconContainer,
  DateText,
  EditContainer,
  CustomToolbar,
  SelectCalenderContainer,
  CustomCalendar,
} from './style';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export default function Task({ entry }: any) {
  const editEntry = useEntryFeedStore((state: any) => state.editEntry);
  const deleteEntry = useEntryFeedStore((state: any) => state.deleteEntry);
  const completeEntry = useEntryFeedStore((state: any) => state.completeEntry);
  const [editing, setEditing] = useState(false);
  const [taskContent, setTaskContent] = useState<string | null>(entry.content);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [date, setDate] = useState();

  useEffect(() => {
    setTaskContent(entry.content);
    if (entry.date) {
      setDate(zonedTimeToUtc(entry.date, timezone));
    }
  }, [entry]);

  const editTask = () => {
    setEditing(false);
    const makeUpdate = async () => {
      if (taskContent) {
        await editEntry(entry.id, taskContent, date);
      } else {
        await editEntry(entry.id, '<p></p>', date);
      }
      setTaskContent('');
    };
    makeUpdate();
  };

  const deleteTask = () => {
    const makeUpdate = async () => {
      await deleteEntry(entry.id);
    };
    makeUpdate();
  };

  const completeTask = () => {
    const makeUpdate = async () => {
      await completeEntry(entry.id);
    };
    makeUpdate();
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
          <button type="button" className="ql-underline" aria-label="Underline"></button>
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
          <button type="button" className="ql-link" aria-label="Insert Link"></button>
          <button type="button" className="ql-image" aria-label="Insert Image"></button>
          <button type="button" className="ql-code-block" aria-label="Insert Code Block"></button>
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-clean" aria-label="Remove Styles"></button>
        </span>
      </div>
      <SelectCalenderContainer>
        <CustomCalendar
          placeholder="Set Due Date"
          showButtonBar
          value={date}
          // @ts-ignore
          onChange={(e) => setDate(e.value)}
        />
      </SelectCalenderContainer>
    </CustomToolbar>
  );

  return (
    <TaskContainer>
      {!editing && (
        <>
          <IconContainer>
            <Button onClick={() => completeTask()} className="p-button-sm">
              Complete Task
            </Button>
            <EditContainer>
              {date && <DateText>Due date: {format(date, 'yyyy-MM-dd')}</DateText>}
              <Icon onClick={() => deleteTask()} className="pi pi-trash" />
              <Icon onClick={() => setEditing(true)} className="pi pi-pencil" />
            </EditContainer>
          </IconContainer>
          <div>{parse(entry.content)}</div>
        </>
      )}
      {editing && (
        <Container>
          <Editor
            style={{ height: '150px', maxWidth: '810px' }}
            // @ts-ignore
            value={taskContent}
            headerTemplate={header}
            onTextChange={(e) => setTaskContent(e.htmlValue)}
          />
          <ButtonContainer>
            <Button onClick={() => editTask()} className="p-button-sm">
              Save
            </Button>
          </ButtonContainer>
        </Container>
      )}
    </TaskContainer>
  );
}