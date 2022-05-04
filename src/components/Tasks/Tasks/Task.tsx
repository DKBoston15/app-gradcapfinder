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
  ProjectLabel,
} from './style';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { useLocation } from 'react-router-dom';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export default function Task({ entry, editable, link, personal }: any) {
  const location = useLocation();
  const editPersonalEntry = useEntryFeedStore((state: any) => state.editPersonalEntry);
  const deletePersonalEntry = useEntryFeedStore((state: any) => state.deletePersonalEntry);
  const completePersonalEntry = useEntryFeedStore((state: any) => state.completePersonalEntry);
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
        await editPersonalEntry(entry.id, taskContent, date);
      } else {
        await editPersonalEntry(entry.id, '<p></p>', date, personal);
      }
      setTaskContent('');
    };
    makeUpdate();
  };

  const deleteTask = () => {
    const makeUpdate = async () => {
      setDate(undefined);
      await deletePersonalEntry(entry.id);
    };
    makeUpdate();
  };

  const completeTask = () => {
    const makeUpdate = async () => {
      setDate(undefined);
      await completePersonalEntry(entry.id);
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

  const labelMapper = {
    articles: 'Article Task',
    research_paradigms: 'Research Paradigm Task',
    research_questions: 'Research Question Task',
    sampling: 'Sampling Task',
    analytic_designs: 'Design Task',
    analysis_techniques: 'Technique Task',
    grants: 'Grant Task',
    figures: 'Figure Task',
    tables: 'Table Task',
    labs: 'Lab Task',
    models: 'Model Task',
    people: 'Person Task',
    key_terms: 'Key Term Task',
    journals: 'Journal Task',
    personal: 'Personal Task',
  };

  return (
    <TaskContainer>
      {!editing && (
        <>
          <IconContainer>
            {!location.pathname.includes('completed') && (
              <Button onClick={() => completeTask()} className="p-button-sm">
                Complete Task
              </Button>
            )}
            <EditContainer>
              <ProjectLabel>{labelMapper[entry.section]}</ProjectLabel>
              {date && <DateText>Due date: {format(date, 'yyyy-MM-dd')}</DateText>}
              <Icon onClick={() => deleteTask()} className="pi pi-trash" />
              {editable && <Icon onClick={() => setEditing(true)} className="pi pi-pencil" />}
              {!personal && (
                <div>
                  {link && (
                    <NavLink
                      to={`/projects/${entry.section}?${sectionMapper[entry.section]}=${
                        entry.connected_id
                      }&projectId=${entry.project_id}`}>
                      <Icon className="pi pi-arrow-right" />
                    </NavLink>
                  )}
                </div>
              )}
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
