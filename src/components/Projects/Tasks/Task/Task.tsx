import React, { useState, useEffect } from 'react';
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
  NavLink,
  CustomEditor,
  DateContainer,
  CustomButton,
} from './style';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export default function Task({ entry, editable, link, selectedProject, toastNotification }: any) {
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
      toastNotification('deletion');
    };
    makeUpdate();
  };

  const completeTask = () => {
    const makeUpdate = async () => {
      await completeEntry(entry.id);
      toastNotification('completion');
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

  const sectionMapper = {
    articles: 'articleId',
    research_paradigms: 'researchParadigmId',
    research_questions: 'researchQuestionId',
    sampling: 'samplingId',
    analytic_designs: 'analyticDesignId',
    analysis_techniques: 'analysisTechniqueId',
    grants: 'grantId',
    figures: 'figureId',
    tables: 'tableId',
    labs: 'labId',
    models: 'modelId',
    people: 'personId',
    key_terms: 'keyTermId',
    journals: 'journalId',
  };

  const renderCustomHeader = () => {
    return <span />;
  };

  const customHeader = renderCustomHeader();

  return (
    <TaskContainer>
      {!editing && (
        <>
          <IconContainer>
            <CustomButton onClick={() => completeTask()} className="p-button-sm">
              Complete Task
            </CustomButton>
            <EditContainer>
              {date && <DateText>Due date: {format(date, 'yyyy-MM-dd')}</DateText>}
              <Icon onClick={() => deleteTask()} className="pi pi-trash" />
              {editable && <Icon onClick={() => setEditing(true)} className="pi pi-pencil" />}
              {link && (
                <NavLink
                  to={`/projects/${entry.section}?${sectionMapper[entry.section]}=${
                    entry.connected_id
                  }&projectId=${selectedProject}`}>
                  <Icon className="pi pi-arrow-right" />
                </NavLink>
              )}
            </EditContainer>
          </IconContainer>
          <CustomEditor
            // @ts-ignore
            value={entry.content}
            headerTemplate={customHeader}
            readOnly={true}
          />
          <DateContainer>Created: {entry.created_at.slice(0, 10)}</DateContainer>
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
