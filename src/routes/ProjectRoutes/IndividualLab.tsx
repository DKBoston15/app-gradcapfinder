import FeedView from '@app/components/Projects/FeedView/FeedView';
import Header from '@app/components/Projects/Header/Header';
import JournalView from '@app/components/Projects/JournalView/JournalView';
import KeyTermView from '@app/components/Projects/KeyTermView/KeyTermView';
import LabInfo from '@app/components/Projects/Labs/LabInfo/LabInfo';
import NoteEditor from '@app/components/Projects/Notes/NoteEditor/NoteEditor';
import PeopleView from '@app/components/Projects/PeopleView/PeopleView';
import TaskView from '@app/components/Projects/TaskView/TaskView';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewLabForm from '../../components/Projects/Labs/AddLabForm/NewLabForm';
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

export default function IndividualLab() {
  const navigate = useNavigate();
  const { projectId, id } = useParams();
  const items = [
    { label: 'Overview', command: () => navigate(`/projects/${projectId}/overview`) },
    {
      label: 'Labs',
      command: () => navigate(`/projects/${projectId}/labs`),
    },
    { label: `Item`, command: () => navigate(`/projects/${projectId}/labs/${id}`) },
  ];

  return (
    <Container>
      <Header items={items} title="Labs">
        <NewLabForm />
      </Header>
      <ContentContainer>
        <LeftSide>
          <Details>
            <LabInfo selectedItem={id} />
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
