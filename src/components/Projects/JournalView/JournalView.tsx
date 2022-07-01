import { useJournalStore } from '@app/stores/journalStore';
import React, { useEffect, useState } from 'react';
import { Tag } from 'primereact/tag';
import {
  JournalContainer,
  JournalName,
  Header,
  NameContainer,
  TagContainer,
  ActionContainer,
  InputLabel,
  AutoContainer,
  Icon,
  NavLink,
  Journal2Container,
  CustomAutoComplete,
} from './styles';
import AddButton from '../AddButton/AddButton';
import NewJournalForm from '../Journals/AddJournalForm/NewJournalForm';
import { useParams } from 'react-router-dom';

export default function JournalView(props: any) {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState();
  const [availableJournals, setAvailableJournals] = useState([]);
  const [projectJournals, setProjectJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);

  const { projectId, id } = useParams();
  const { journals, addJournalConnection, removeJournalConnection } = useJournalStore((state) => ({
    journals: state.journals,
    addJournalConnection: state.addJournalConnection,
    removeJournalConnection: state.removeJournalConnection,
  }));

  useEffect(() => {
    const projectJournals = journals.filter((journal) => journal.connected_entities.includes(id));
    setProjectJournals(projectJournals);
    if (projectJournals.length >= 7) {
      setDisabled(true);
    }

    let availableJournals = journals.filter((journal) => journal.project_id == projectId);
    availableJournals = availableJournals.filter(
      (journal) => !journal.connected_entities.includes(id),
    );
    setAvailableJournals(availableJournals);
    setFilteredJournals(availableJournals);
    setLoading(false);
  }, [id, journals]);

  const removeJournal = async (id: any) => {
    await removeJournalConnection(id, props.connectedId);
  };

  const handleSelection = (e: any) => {
    addJournalConnection(e.id, props.connectedId);
    setSelectedJournal('');
  };

  const searchJournal = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredJournals;
      if (!event.query.trim().length) {
        _filteredJournals = [...availableJournals];
      } else {
        _filteredJournals = availableJournals.filter((fullJournal: any) => {
          return fullJournal.title.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredJournals(_filteredJournals);
    }, 250);
  };

  return (
    <div>
      {!loading && (
        <>
          <Header>
            <AutoContainer>
              <InputLabel>Add Journal</InputLabel>
              <CustomAutoComplete
                tooltip="3-7 Journals Max"
                tooltipOptions={{ disabled: !disabled }}
                disabled={disabled}
                dropdown
                value={selectedJournal}
                suggestions={filteredJournals}
                completeMethod={searchJournal}
                field="title"
                onChange={(e) => setSelectedJournal(e.value)}
                onSelect={(e) => handleSelection(e.value)}
              />
            </AutoContainer>
            <AddButton
              tooltipName="Journals"
              header="+ New Journal"
              buttonLabel="New Journal"
              disabled={disabled}>
              {/* @ts-ignore */}
              <NewJournalForm connectedEntity={props.connectedId} />
            </AddButton>
          </Header>
          <Journal2Container>
            {projectJournals.map((item: any) => (
              <JournalContainer key={item.id}>
                <NameContainer>
                  <JournalName>{item.title}</JournalName>
                </NameContainer>

                <TagContainer>
                  {item.primary && <Tag value="Primary" severity="warning"></Tag>}
                </TagContainer>

                <ActionContainer>
                  <NavLink to={`/projects/${projectId}/journals/${item.id}`}>
                    <i className="pi pi-arrow-right" />
                  </NavLink>
                  <Icon className="pi pi-trash" onClick={() => removeJournal(item.id)}></Icon>
                </ActionContainer>
              </JournalContainer>
            ))}
          </Journal2Container>
        </>
      )}
    </div>
  );
}
