import { useProjectStore } from '@app/stores/projectStore';
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
} from './styles';
import AddButton from '../AddButton/AddButton';
import NewJournalForm from '../Journals/AddJournalForm/NewJournalForm';
import { supabase } from '@app/supabase/index';
import { AutoComplete } from 'primereact/autocomplete';
import { connected } from 'process';

const filterByReference = (arr1: any, arr2: any) => {
  let res = [];
  res = arr1.filter((el: any) => {
    return !arr2.find((element: any) => {
      return element.id === el.id;
    });
  });
  return res;
};

export default function JournalView(props: any) {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [localJournals, setLocalJournals] = useState([]);
  const [fullJournals, setFullJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState();

  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const getConnectedJournals = useJournalStore((state: any) => state.getConnectedJournals);
  const getJournals = useJournalStore((state: any) => state.getJournals);
  const addJournalConnection = useJournalStore((state: any) => state.addJournalConnection);
  const removeJournalConnection = useJournalStore((state: any) => state.removeJournalConnection);

  const handleRealtimeUpdate = async (payload: any) => {
    if (payload.eventType === 'INSERT') {
      const connectedJournals = await getConnectedJournals(selectedProject, props.connectedId);
      setLocalJournals(
        connectedJournals.sort((a: any, b: any) => (a.primary > b.primary ? -1 : 1)),
      );
      setupFilteredList(connectedJournals);
    }
  };

  useEffect(() => {
    const realtimeProfileUpdates = supabase
      .from('journals')
      .on('*', (payload) => {
        handleRealtimeUpdate(payload);
      })
      .subscribe();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const connectedJournals = await getConnectedJournals(selectedProject, props.connectedId);
      const allJournals = await getJournals(selectedProject);
      setLocalJournals(
        connectedJournals.sort((a: any, b: any) => (a.primary > b.primary ? -1 : 1)),
      );
      setFullJournals(
        filterByReference(allJournals, connectedJournals).sort((a: any, b: any) =>
          a.primary > b.primary ? -1 : 1,
        ),
      );
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    if (localJournals.length >= 7) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [localJournals]);

  const setupFilteredList = (listToBeRemoved: any) => {
    setFullJournals(
      filterByReference(fullJournals, listToBeRemoved).sort((a: any, b: any) =>
        a.primary > b.primary ? -1 : 1,
      ),
    );
  };

  const handleSelection = (e: any) => {
    const setConnectedJournal = async () => {
      const newJournal = await addJournalConnection(e.id, props.connectedId);
      setSelectedJournal(undefined);
      const newConnectedJournals = [...localJournals];
      // @ts-ignore
      newConnectedJournals.push(newJournal[0]);
      setLocalJournals(
        newConnectedJournals.sort((a: any, b: any) => (a.primary > b.primary ? -1 : 1)),
      );
      setupFilteredList(newConnectedJournals);
    };
    if (e && props.connectedId) {
      setConnectedJournal();
    }
  };

  const removeJournal = async (id: any) => {
    await removeJournalConnection(id, props.connectedId);
    const newJournalList = localJournals.filter(function (e: any) {
      return e.id != id;
    });
    setLocalJournals(newJournalList);

    const allJournals = await getJournals(selectedProject);
    setFullJournals(
      filterByReference(allJournals, newJournalList).sort((a: any, b: any) =>
        a.primary > b.primary ? -1 : 1,
      ),
    );
  };

  const searchJournal = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredJournals;
      if (!event.query.trim().length) {
        _filteredJournals = [...fullJournals];
      } else {
        _filteredJournals = fullJournals.filter((fullJournal: any) => {
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
              <AutoComplete
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
            {localJournals.map((item: any) => (
              <JournalContainer key={item.id}>
                <NameContainer>
                  <JournalName>{item.title}</JournalName>
                </NameContainer>

                <TagContainer>{item.primary && <Tag value="Primary"></Tag>}</TagContainer>

                <ActionContainer>
                  <NavLink
                    to={`/projects/journals?journalId=${item.id}&projectId=${selectedProject}`}>
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
