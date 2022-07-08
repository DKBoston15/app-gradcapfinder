import FeedView from '@app/components/Projects/FeedView/FeedView';
import Header from '@app/components/Projects/Header/Header';
import JournalInfo from '@app/components/Projects/Journals/JournalInfo/JournalInfo';
import JournalView from '@app/components/Projects/JournalView/JournalView';
import KeyTermView from '@app/components/Projects/KeyTermView/KeyTermView';
import NoteEditor from '@app/components/Projects/Notes/NoteEditor/NoteEditor';
import PeopleView from '@app/components/Projects/PeopleView/PeopleView';
import TaskView from '@app/components/Projects/TaskView/TaskView';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewJournalForm from '../../components/Projects/Journals/AddJournalForm/NewJournalForm';
import {
  Container,
  Details,
  Tasks,
  ContentContainer,
  RightSide,
  PeopleContainer,
  JournalContainer,
  KeytermContainer,
  Notes,
  LeftSide,
  Title,
} from './RouteStyles/project_feed.styles';

export default function IndividualJournal() {
  const navigate = useNavigate();
  const { projectId, id } = useParams();
  const items = [
    { label: 'Overview', command: () => navigate(`/projects/${projectId}/overview`) },
    {
      label: 'Journals',
      command: () => navigate(`/projects/${projectId}/journals`),
    },
    { label: `Item`, command: () => navigate(`/projects/${projectId}/journals/${id}`) },
  ];

  return (
    <Container>
      <Header items={items} title="Journals">
        <NewJournalForm />
      </Header>
      <ContentContainer>
        <LeftSide>
          <Details>
            <JournalInfo selectedItem={id} />
          </Details>
          <Notes>
            <Title>Notes</Title>
            <NoteEditor connectedId={id} />
            <FeedView connectedId={id} />
          </Notes>
        </LeftSide>
        <RightSide>
          <Tasks>
            <TaskView connectedId={id} />
          </Tasks>
          <PeopleContainer>
            <PeopleView connectedId={id} />
          </PeopleContainer>
          <JournalContainer>
            <JournalView connectedId={id} />
          </JournalContainer>
          <KeytermContainer>
            <KeyTermView connectedId={id} />
          </KeytermContainer>
        </RightSide>
      </ContentContainer>
    </Container>
  );
}
