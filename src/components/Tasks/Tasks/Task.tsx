import React, { useState, useEffect } from 'react';
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
  CustomEditor,
  DateContainer,
  CustomButton,
  Icons,
  ProjectName,
} from './style';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { useLocation } from 'react-router-dom';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { useProjectStore } from '@app/stores/projectStore';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export default function Task({ entry, editable, link, toastNotification }: any) {
  const location = useLocation();
  const editEntry = useEntryFeedStore((state: any) => state.editEntry);
  const deleteEntry = useEntryFeedStore((state: any) => state.deleteEntry);
  const completeEntry = useEntryFeedStore((state: any) => state.completeEntry);
  const [editing, setEditing] = useState(false);
  const [taskContent, setTaskContent] = useState<string | null>(entry.content);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [date, setDate] = useState();
  const getProjectName = useProjectStore((state: any) => state.getProjectName);
  const [name, setName] = useState('');

  const getName = async () => {
    setName(await getProjectName(entry.project_id));
  };

  useEffect(() => {
    setTaskContent(entry.content);
    if (entry) {
      getName();
    }
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
      setDate(undefined);
      await deleteEntry(entry.id);
      toastNotification('deletion');
    };
    makeUpdate();
  };

  const completeTask = () => {
    const makeUpdate = async () => {
      setDate(undefined);
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
    literature: 'literatureId',
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
    literature: 'Literature Task',
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

  const renderCustomHeader = () => {
    return <span />;
  };

  const customHeader = renderCustomHeader();
  return (
    <TaskContainer>
      {!editing && (
        <>
          <IconContainer>
            {!location.pathname.includes('completed') && (
              <CustomButton onClick={() => completeTask()} className="p-button-sm">
                Complete Task
              </CustomButton>
            )}
            <EditContainer>
              {name && <ProjectName>{name}</ProjectName>}
              <ProjectLabel>{labelMapper[entry.section]}</ProjectLabel>
              {date && <DateText>Due date: {format(date, 'yyyy-MM-dd')}</DateText>}
              {!entry.completed_date && (
                <Icons>
                  <Icon onClick={() => deleteTask()} className="pi pi-trash" />
                  {editable && <Icon onClick={() => setEditing(true)} className="pi pi-pencil" />}
                  {entry.section !== 'personal' && (
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
                </Icons>
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
            style={{ height: '150px', maxWidth: '900px' }}
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
