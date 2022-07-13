import FeedView from '@app/components/Projects/FeedView/FeedView';
import Header from '@app/components/Projects/Header/Header';
import JournalView from '@app/components/Projects/JournalView/JournalView';
import KeyTermView from '@app/components/Projects/KeyTermView/KeyTermView';
import LiteratureInfo from '@app/components/Projects/Literature/LiteratureInfo/LiteratureInfo';
import NoteEditor from '@app/components/Projects/Notes/NoteEditor/NoteEditor';
import PeopleView from '@app/components/Projects/PeopleView/PeopleView';
import Reference from '@app/components/Projects/Reference/Reference';
import TaskView from '@app/components/Projects/TaskView/TaskView';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewLiteratureForm from '../../components/Projects/Literature/AddLiteratureForm/NewLiteratureForm';
import {
  Container,
  Details,
  Tasks,
  ContentContainer,
  ReferenceContainer,
  RightSide,
  PeopleContainer,
  JournalContainer,
  KeytermContainer,
  Notes,
  LeftSide,
  Title,
} from './RouteStyles/project_feed.styles';

export default function IndividualLiterature() {
  const navigate = useNavigate();
  const { projectId, id } = useParams();
  const items = [
    { label: 'Overview', command: () => navigate(`/projects/${projectId}/overview`) },
    { label: 'Literature', command: () => navigate(`/projects/${projectId}/literature`) },
    { label: `Item`, command: () => navigate(`/projects/${projectId}/literature/${id}`) },
  ];

  return (
    <Container>
      <Header items={items} title="Literature">
        <NewLiteratureForm />
      </Header>
      <ContentContainer>
        <LeftSide>
          <Details>
            <LiteratureInfo selectedLiterature={id} />
          </Details>
          <Notes>
            <Title>Notes</Title>
            <NoteEditor connectedId={id} />
            <FeedView connectedId={id} />
          </Notes>
        </LeftSide>
        <RightSide>
          <ReferenceContainer>
            <Reference selectedLiterature={id} />
          </ReferenceContainer>
          <Tasks reference={true}>
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
