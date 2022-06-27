import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewPersonForm from '../../components/Projects/People/AddPeopleForm/NewPersonForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import { usePeopleStore } from '@app/stores/peopleStore';
import PeopleInfo from '@app/components/Projects/People/PeopleInfo/PeopleInfo';

const options = {
  keys: ['first_name'],
};

export default function People() {
  const [saving, setSaving] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectPeople, setProjectPeople] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { people, deletePerson } = usePeopleStore((state) => ({
    people: state.people,
    deletePerson: state.deletePerson,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredPeople = people.filter((person) => person.id == id);
    setSelectedPeople(filteredPeople[0]);
  }, [id, people]);

  useEffect(() => {
    const filteredProjectPeople = people.filter((person) => person.project_id == projectId);
    setProjectPeople(filteredProjectPeople);
    setLoading(false);
  }, [projectId, people]);

  return (
    <Layout>
      <ProjectNavBar />
      <MobileBottomNavBar />
      <Container>
        {!loading && (
          <>
            <InfoNavBar
              items={projectPeople}
              selectedProject={projectId}
              options={options}
              header="People"
              title="people"
            />
            <Feed selectedItem={selectedPeople} header="Pick a Person">
              {selectedPeople && (
                <SplitAddButton
                  selectedItem={selectedPeople}
                  deleteFunction={deletePerson}
                  // @ts-ignore
                  confirmMessage={`Are you sure you want to delete ${selectedPeople.first_name}?`}
                  confirmHeader="Delete Person"
                  buttonLabel="New Person">
                  <NewPersonForm />
                </SplitAddButton>
              )}
              {!selectedPeople && (
                <AddButton header="+ New Person" buttonLabel="New Person">
                  <NewPersonForm />
                </AddButton>
              )}
            </Feed>
            <InfoView header="Details" saving={saving}>
              <PeopleInfo selectedItem={selectedPeople} setSaving={setSaving} />
            </InfoView>
            <MobileInfoView header="Details" saving={saving}>
              <PeopleInfo selectedItem={selectedPeople} setSaving={setSaving} />
            </MobileInfoView>
          </>
        )}
      </Container>
    </Layout>
  );
}
