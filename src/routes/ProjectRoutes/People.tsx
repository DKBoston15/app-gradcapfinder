import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/authors.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewPersonForm from '../../components/Projects/People/AddPeopleForm/NewPersonForm';
import { usePeopleStore } from '../../stores/peopleStore';
import PeopleInfo from '../../components/Projects/People/PeopleInfo/PeopleInfo';

const options = {
  keys: ['title'],
};

export default function People({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const people = usePeopleStore((state: any) => state.people);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deletePeople = usePeopleStore((state: any) => state.deletePeople);
  const [loading, setLoading] = useState(true);
  const getPeople = usePeopleStore((state: any) => state.getPeople);

  useEffect(() => {
    const getData = async () => {
      await getPeople(selectedProject);
    };
    getData();
  }, []);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (people.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const personId = searchParams.get('personId');
        if (people && personId) {
          const filteredAuthor = people.filter((author: any) => author.id == personId);
          setSelectedItem(filteredAuthor[0]);
        }
      }
    }
    setLoading(false);
  }, [people, selectedProject]);

  const handleDeletion = () => {
    setSelectedItem(people[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={people}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="People"
            searchQueryTitle="personId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Person">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deletePeople}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Person"
                buttonLabel="New Person">
                <NewPersonForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Person" buttonLabel="New Person">
                <NewPersonForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <PeopleInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
