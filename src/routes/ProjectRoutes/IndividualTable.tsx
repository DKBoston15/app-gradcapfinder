import FeedView from '@app/components/Projects/FeedView/FeedView';
import Header from '@app/components/Projects/Header/Header';
import JournalView from '@app/components/Projects/JournalView/JournalView';
import KeyTermView from '@app/components/Projects/KeyTermView/KeyTermView';
import NoteEditor from '@app/components/Projects/Notes/NoteEditor/NoteEditor';
import PeopleView from '@app/components/Projects/PeopleView/PeopleView';
import TableInfo from '@app/components/Projects/Tables/TableInfo/TableInfo';
import TaskView from '@app/components/Projects/TaskView/TaskView';
import { useGeneralStore } from '@app/stores/generalStore';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewTableForm from '../../components/Projects/Tables/AddTableForm/NewTableForm';
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

export default function IndividualTable() {
  const navigate = useNavigate();
  const { handleNavChange } = useGeneralStore((state) => ({
    handleNavChange: state.handleNavChange,
  }));
  const { projectId, id } = useParams();
  const items = [
    { label: 'Overview', command: () => handleNavChange(`/projects/${projectId}/overview`) },
    {
      label: 'Tables',
      command: () => handleNavChange(`/projects/${projectId}/tables`),
    },
    { label: `Item`, command: () => navigate(`/projects/${projectId}/tables/${id}`) },
  ];

  return (
    <Container>
      <Header items={items} title="Table">
        <NewTableForm />
      </Header>
      <ContentContainer>
        <LeftSide>
          <Details>
            <TableInfo selectedItem={id} />
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
