import FeedView from '@app/components/Projects/FeedView/FeedView';
import Header from '@app/components/Projects/Header/Header';
import JournalView from '@app/components/Projects/JournalView/JournalView';
import KeyTermView from '@app/components/Projects/KeyTermView/KeyTermView';
import NoteEditor from '@app/components/Projects/Notes/NoteEditor/NoteEditor';
import PeopleView from '@app/components/Projects/PeopleView/PeopleView';
import SampleInfo from '@app/components/Projects/Samples/SampleInfo/SampleInfo';
import TaskView from '@app/components/Projects/TaskView/TaskView';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewSampleForm from '@app/components/Projects/Samples/AddSampleForm/NewSampleForm';
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
import { useGeneralStore } from '@app/stores/generalStore';

export default function IndividualSample() {
  const navigate = useNavigate();
  const { handleNavChange } = useGeneralStore((state) => ({
    handleNavChange: state.handleNavChange,
  }));
  const { projectId, id } = useParams();
  const items = [
    {
      label: 'Samples',
      command: () => handleNavChange(`/analysis/samples`),
    },
    { label: `Item`, command: () => navigate(`/analysis/samples/${id}`) },
  ];

  return (
    <Container>
      <Header items={items} title="Sample">
        <NewSampleForm />
      </Header>
      <ContentContainer>
        <LeftSide>
          <Details>
            <SampleInfo selectedItem={id} />
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
