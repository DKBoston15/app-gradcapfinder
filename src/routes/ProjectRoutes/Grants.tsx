import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/grants.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewGrantForm from '../../components/Projects/Grants/AddGrantForm/NewGrantForm';
import { useGrantStore } from '../../stores/grantStore';
import GrantInfo from '../../components/Projects/Grants/GrantInfo/GrantInfo';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';

const options = {
  keys: ['title'],
};

export default function Grants({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const grants = useGrantStore((state: any) => state.grants);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteGrant = useGrantStore((state: any) => state.deleteGrant);
  const [loading, setLoading] = useState(true);
  const getGrants = useGrantStore((state: any) => state.getGrants);

  useEffect(() => {
    const getData = async () => {
      await getGrants(selectedProject);
    };
    getData();
  }, []);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (grants.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const grantId = searchParams.get('grantId');
        if (grants && grantId) {
          const filteredGrant = grants.filter((grant: any) => grant.id == grantId);
          setSelectedItem(filteredGrant[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject, grants]);

  useEffect(() => {
    setLoading(false);
    setLoading(true);
    setLoading(false);
  }, [grants]);

  const handleDeletion = () => {
    setSelectedItem(grants[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={grants}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Grants"
            searchQueryTitle="grantId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Grant">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteGrant}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Grant"
                buttonLabel="New Grant">
                <NewGrantForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Grant" buttonLabel="New Grant">
                <NewGrantForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <GrantInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
          <MobileInfoView header="Details" saving={saving}>
            <GrantInfo selectedItem={selectedItem} setSaving={setSaving} />
          </MobileInfoView>
        </>
      )}
    </Container>
  );
}
