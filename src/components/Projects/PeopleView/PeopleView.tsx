import { useProjectStore } from '@app/stores/projectStore';
import React, { useEffect, useState } from 'react';
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
  NavLink,
  InputLabelSecondary,
  People2Container,
  CustomAutoComplete,
} from './styles';
import AddButton from '../AddButton/AddButton';
import NewPersonForm from '../People/AddPeopleForm/NewPersonForm';
import { AutoComplete } from 'primereact/autocomplete';
import { usePeopleStore } from '@app/stores/peopleStore';
import { Divider } from 'primereact/divider';

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
  const [selectedPeople, setSelectedPeople] = useState();
  const [peopleNotIncluded, setPeopleNotIncluded] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const getConnectedPeople = usePeopleStore((state: any) => state.getConnectedPeople);
  const getPeople = usePeopleStore((state: any) => state.getPeople);
  const getConnectedAuthors = usePeopleStore((state: any) => state.getConnectedAuthors);
  const addPeopleConnection = usePeopleStore((state: any) => state.addPeopleConnection);
  const removePeopleConnection = usePeopleStore((state: any) => state.removePeopleConnection);
  const connectedAuthors = usePeopleStore((state: any) => state.connectedAuthors);
  const connectedPeople = usePeopleStore((state: any) => state.connectedPeople);
  const people = usePeopleStore((state: any) => state.people);

  useEffect(() => {
    const getData = async () => {
      const allConnectedAuthors = await getConnectedAuthors(selectedProject, props.connectedId);
      const allConnectedPeople = await getConnectedPeople(selectedProject, props.connectedId);
      setupFilteredList([...allConnectedAuthors, ...allConnectedPeople]);
      setLoading(false);
    };
    getData();
  }, []);

  const setupFilteredList = (listToBeRemoved: any) => {
    const handleAsync = async () => {
      const allPeople = await getPeople(selectedProject);
      setPeopleNotIncluded(
        filterByReference(allPeople, listToBeRemoved).sort((a: any, b: any) =>
          a.primary > b.primary ? -1 : 1,
        ),
      );
      setFilteredPeople(
        filterByReference(allPeople, listToBeRemoved).sort((a: any, b: any) =>
          a.primary > b.primary ? -1 : 1,
        ),
      );
    };
    handleAsync();
  };

  const handleSelection = (e: any) => {
    const setConnectedPeople = async () => {
      const newPeople = await addPeopleConnection(e.id, props.connectedId, e.role);
      setSelectedPeople(undefined);
      const newArr = peopleNotIncluded.filter((person) => person.id !== e.id);
      setPeopleNotIncluded([...newArr]);
    };
    if (e && props.connectedId) {
      setConnectedPeople();
    }
  };

  const removePeople = async (id: any, role: any) => {
    await removePeopleConnection(id, props.connectedId, role);
    const newPeopleList = people.filter(function (e: any) {
      return e.id == id;
    });
    peopleNotIncluded.push(newPeopleList[0]);
  };

  const searchPeople = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredPeople;
      if (!event.query.trim().length) {
        _filteredPeople = [...peopleNotIncluded];
      } else {
        _filteredPeople = peopleNotIncluded.filter((fullPerson: any) => {
          return fullPerson.first_name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredPeople(_filteredPeople);
    }, 250);
  };

  const itemTemplate = (item: any) => {
    const lastName = item.last_name || '';
    return `${item.first_name} ${lastName}`;
  };

  return (
    <div>
      {!loading && (
        <>
          <Header>
            <AutoContainer>
              <InputLabel>Add Person</InputLabel>
              <CustomAutoComplete
                tooltip="3-7 People Max"
                tooltipOptions={{ disabled: !disabled }}
                disabled={false}
                dropdown
                value={selectedPeople}
                suggestions={filteredPeople}
                completeMethod={searchPeople}
                field="first_name"
                onChange={(e) => setSelectedPeople(e.value)}
                onSelect={(e) => handleSelection(e.value)}
                itemTemplate={itemTemplate}
              />
            </AutoContainer>
            <AddButton
              tooltipName="People"
              header="+ New Person"
              buttonLabel="New Person"
              disabled={false}>
              {/* @ts-ignore */}
              <NewPersonForm connectedEntity={props.connectedId} />
            </AddButton>
          </Header>
          <InputLabelSecondary>Authors</InputLabelSecondary>
          <Divider />
          <ul>
            {connectedAuthors.map((item: any) => (
              <PeopleContainer key={item.id}>
                <NameContainer>
                  <PeopleName>
                    {item.first_name}

                    {item.last_name && <> {item.last_name}</>}
                  </PeopleName>
                </NameContainer>

                <TagContainer>
                  {item.primary && <CustomTag value="Primary" severity="warning" />}
                  {item.role && <CustomTag severity="info" value={item.role} />}
                </TagContainer>

                <ActionContainer>
                  <NavLink to={`/projects/people?personId=${item.id}&projectId=${selectedProject}`}>
                    <i className="pi pi-arrow-right" />
                  </NavLink>
                  <Icon
                    className="pi pi-trash"
                    onClick={() => removePeople(item.id, item.role)}></Icon>
                </ActionContainer>
              </PeopleContainer>
            ))}
          </ul>
          <InputLabelSecondary>People</InputLabelSecondary>
          <Divider />
          <People2Container>
            {connectedPeople.map((item: any) => (
              <PeopleContainer key={item.id}>
                <NameContainer>
                  <PeopleName>
                    {item.first_name} {item.last_name && <> {item.last_name}</>}
                  </PeopleName>
                </NameContainer>

                <TagContainer>
                  {item.primary && <CustomTag value="Primary" severity="warning" />}
                  {item.role && <CustomTag severity="info" value={item.role} />}
                </TagContainer>

                <ActionContainer>
                  <NavLink to={`/projects/people?personId=${item.id}&projectId=${selectedProject}`}>
                    <i className="pi pi-arrow-right" />
                  </NavLink>
                  <Icon
                    className="pi pi-trash"
                    onClick={() => removePeople(item.id, item.role)}></Icon>
                </ActionContainer>
              </PeopleContainer>
            ))}
          </People2Container>
        </>
      )}
    </div>
  );
}
