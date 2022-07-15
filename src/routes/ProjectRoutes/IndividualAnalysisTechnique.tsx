import AnalysisTechniqueInfo from '@app/components/Projects/AnalysisTechniques/AnalysisTechniqueInfo/AnalysisTechniqueInfo';
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
import NewAnalysisTechniqueForm from '../../components/Projects/AnalysisTechniques/AddAnalysisTechniqueForm/NewAnalysisTechniqueForm';
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

export default function IndividualAnalysisTechnique() {
  const navigate = useNavigate();
  const { handleNavChange } = useGeneralStore((state) => ({
    handleNavChange: state.handleNavChange,
  }));
  const { projectId, id } = useParams();

  const items = [
    {
      label: 'Overview',
      command: () => {
        handleNavChange(`/projects/${projectId}/overview`);
      },
    },
    {
      label: 'Analysis Techniques',
      command: () => {
        handleNavChange(`/projects/${projectId}/analysis_techniques`);
      },
    },
    { label: `Item`, command: () => navigate(`/projects/${projectId}/analysis_techniques/${id}`) },
  ];

  return (
    <Container>
      <Header items={items} title="Analysis Techniques">
        <NewAnalysisTechniqueForm />
      </Header>
      <ContentContainer>
        <LeftSide>
          <Details>
            <AnalysisTechniqueInfo selectedItem={id} />
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
