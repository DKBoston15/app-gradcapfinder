import { useProjectStore } from '@app/stores/projectStore';
import { useEffect, useState } from 'react';
import {
  PeopleContainer,
  PeopleName,
  Header,
  NameContainer,
  TagContainer,
  ActionContainer,
  InputLabel,
  AutoContainer,
  Icon,
  CustomTag,
} from './styles';
import AddButton from '../AddButton/AddButton';
import NewPersonForm from '../People/AddPeopleForm/NewPersonForm';
import { supabase } from '@app/supabase/index';
import { AutoComplete } from 'primereact/autocomplete';
import { usePeopleStore } from '@app/stores/peopleStore';

const filterByReference = (arr1: any, arr2: any) => {
  let res = [];
  res = arr1.filter((el: any) => {
    return !arr2.find((element: any) => {
      return element.id === el.id;
    });
  });
  return res;
};

export default function PeopleView(props: any) {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [localPeople, setLocalPeople] = useState([]);
  const [fullPeople, setFullPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState();

  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const getConnectedPeople = usePeopleStore((state: any) => state.getConnectedPeople);
  const getPeople = usePeopleStore((state: any) => state.getPeople);
  const addPeopleConnection = usePeopleStore((state: any) => state.addPeopleConnection);
  const removePeopleConnection = usePeopleStore((state: any) => state.removePeopleConnection);

  const handleRealtimeUpdate = async (payload: any) => {
    if (payload.eventType === 'INSERT') {
      const connectedPeople = await getConnectedPeople(selectedProject, props.connectedId);
      setLocalPeople(connectedPeople.sort((a: any, b: any) => (a.primary > b.primary ? -1 : 1)));
      setupFilteredList(connectedPeople);
    }
  };

  useEffect(() => {
    const realtimeProfileUpdates = supabase
      .from('people')
      .on('*', (payload) => {
        handleRealtimeUpdate(payload);
      })
      .subscribe();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const connectedPeople = await getConnectedPeople(selectedProject, props.connectedId);
      const allPeople = await getPeople(selectedProject);
      setLocalPeople(connectedPeople.sort((a: any, b: any) => (a.primary > b.primary ? -1 : 1)));
      setFullPeople(
        filterByReference(allPeople, connectedPeople).sort((a: any, b: any) =>
          a.primary > b.primary ? -1 : 1,
        ),
      );
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    if (localPeople.length >= 7) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [localPeople]);

  const setupFilteredList = (listToBeRemoved: any) => {
    setFullPeople(
      filterByReference(fullPeople, listToBeRemoved).sort((a: any, b: any) =>
        a.primary > b.primary ? -1 : 1,
      ),
    );
  };

  const handleSelection = (e: any) => {
    const setConnectedPeople = async () => {
      const newPeople = await addPeopleConnection(e.id, props.connectedId);
      setSelectedPeople(undefined);
      const newConnectedPeople = [...localPeople];
      // @ts-ignore
      newConnectedPeople.push(newPeople[0]);
      setLocalPeople(newConnectedPeople.sort((a: any, b: any) => (a.primary > b.primary ? -1 : 1)));
      setupFilteredList(newConnectedPeople);
    };
    if (e && props.connectedId) {
      setConnectedPeople();
    }
  };

  const removePeople = async (id: any) => {
    await removePeopleConnection(id, props.connectedId);
    const newPeopleList = localPeople.filter(function (e: any) {
      return e.id != id;
    });
    setLocalPeople(newPeopleList);

    const allPeople = await getPeople(selectedProject);
    setFullPeople(
      filterByReference(allPeople, newPeopleList).sort((a: any, b: any) =>
        a.primary > b.primary ? -1 : 1,
      ),
    );
  };

  const searchPeople = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredPeople;
      if (!event.query.trim().length) {
        _filteredPeople = [...fullPeople];
      } else {
        _filteredPeople = fullPeople.filter((fullPerson: any) => {
          return fullPerson.first_name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredPeople(_filteredPeople);
    }, 250);
  };

  return (
    <div>
      {!loading && (
        <>
          <Header>
            <AutoContainer>
              <InputLabel>Add Person</InputLabel>
              <AutoComplete
                tooltip="3-7 People Max"
                tooltipOptions={{ disabled: !disabled }}
                disabled={disabled}
                dropdown
                value={selectedPeople}
                suggestions={filteredPeople}
                completeMethod={searchPeople}
                field="first_name"
                onChange={(e) => setSelectedPeople(e.value)}
                onSelect={(e) => handleSelection(e.value)}
              />
            </AutoContainer>
            <AddButton
              tooltipName="People"
              header="+ New Person"
              buttonLabel="New Person"
              disabled={disabled}>
              {/* @ts-ignore */}
              <NewPersonForm connectedEntity={props.connectedId} />
            </AddButton>
          </Header>
          <ul>
            {localPeople.map((item: any) => (
              <PeopleContainer key={item.id}>
                <NameContainer>
                  <PeopleName>
                    {item.first_name} {item.last_name}
                  </PeopleName>
                </NameContainer>

                <TagContainer>
                  {item.primary && <CustomTag value="Primary"></CustomTag>}
                  <CustomTag severity="info" value={item.role}></CustomTag>
                </TagContainer>

                <ActionContainer>
                  <Icon className="pi pi-trash" onClick={() => removePeople(item.id)}></Icon>
                </ActionContainer>
              </PeopleContainer>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
