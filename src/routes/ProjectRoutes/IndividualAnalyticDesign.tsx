import AnalyticDesignInfo from '@app/components/Projects/AnalyticDesigns/AnalyticDesignInfo/AnalyticDesignInfo';
import FeedView from '@app/components/Projects/FeedView/FeedView';
import Header from '@app/components/Projects/Header/Header';
import JournalView from '@app/components/Projects/JournalView/JournalView';
import KeyTermView from '@app/components/Projects/KeyTermView/KeyTermView';
import NoteEditor from '@app/components/Projects/Notes/NoteEditor/NoteEditor';
import PeopleView from '@app/components/Projects/PeopleView/PeopleView';
import TaskView from '@app/components/Projects/TaskView/TaskView';
import { useGeneralStore } from '@app/stores/generalStore';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewAnalyticDesignForm from '../../components/Projects/AnalyticDesigns/AddAnalyticDesignForm/NewAnalyticDesignForm';
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

export default function IndividualAnalyticDesign() {
  const navigate = useNavigate();
  const { handleNavChange } = useGeneralStore((state) => ({
    handleNavChange: state.handleNavChange,
  }));
  const { projectId, id } = useParams();
  const items = [
    {
      label: 'Analytic Designs',
      command: () => handleNavChange(`/research/analytic_designs`),
    },
    { label: `Item`, command: () => navigate(`/research/analytic_designs/${id}`) },
  ];

  return (
    <Container>
      <Header items={items} title="Analytic Designs">
        <NewAnalyticDesignForm />
      </Header>
      <ContentContainer>
        <LeftSide>
          <Details>
            <AnalyticDesignInfo selectedItem={id} />
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
