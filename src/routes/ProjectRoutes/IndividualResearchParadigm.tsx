import FeedView from '@app/components/Projects/FeedView/FeedView';
import Header from '@app/components/Projects/Header/Header';
import JournalView from '@app/components/Projects/JournalView/JournalView';
import KeyTermView from '@app/components/Projects/KeyTermView/KeyTermView';
import NoteEditor from '@app/components/Projects/Notes/NoteEditor/NoteEditor';
import PeopleView from '@app/components/Projects/PeopleView/PeopleView';
import ResearchParadigmInfo from '@app/components/Projects/ResearchParadigms/ResearchParadigmInfo/ResearchParadigmInfo';
import TaskView from '@app/components/Projects/TaskView/TaskView';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewResearchParadigmForm from '../../components/Projects/ResearchParadigms/AddResearchParadigmForm/NewResearchParadigmForm';
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

export default function IndividualResearchParadigm() {
  const navigate = useNavigate();
  const { projectId, id } = useParams();
  const items = [
    { label: 'Overview', command: () => navigate(`/projects/${projectId}/overview`) },
    {
      label: 'Research Paradigms',
      command: () => navigate(`/projects/${projectId}/research_paradigms`),
    },
    { label: `Item`, command: () => navigate(`/projects/${projectId}/research_paradigms/${id}`) },
  ];

  return (
    <Container>
      <Header items={items} title="Research Paradigm">
        <NewResearchParadigmForm />
      </Header>
      <ContentContainer>
        <LeftSide>
          <Details>
            <ResearchParadigmInfo selectedItem={id} />
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
