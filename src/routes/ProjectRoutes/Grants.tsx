import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewGrantForm from '../../components/Projects/Grants/AddGrantForm/NewGrantForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import { useGrantStore } from '@app/stores/grantStore';
import GrantInfo from '@app/components/Projects/Grants/GrantInfo/GrantInfo';

const options = {
  keys: ['title'],
};

export default function Grants() {
  const [saving, setSaving] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectGrants, setProjectGrants] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { grants, deleteGrant } = useGrantStore((state) => ({
    grants: state.grants,
    deleteGrant: state.deleteGrant,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredGrants = grants.filter((grant) => grant.id == id);
    setSelectedGrant(filteredGrants[0]);
  }, [id]);

  useEffect(() => {
    const filteredProjectGrants = grants.filter((grant) => grant.project_id == projectId);
    setProjectGrants(filteredProjectGrants);
    setLoading(false);
  }, [projectId]);

  const handleDeletion = () => {
    deleteGrant(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };
  return (
    <Layout>
      <ProjectNavBar />
      <MobileBottomNavBar />
      <Container>
        {!loading && (
          <>
            <InfoNavBar
              items={projectGrants}
              selectedProject={projectId}
              options={options}
              header="Grants"
              title="grants"
            />
            <Feed selectedItem={selectedGrant} header="Pick a Grant">
              {selectedGrant && (
                <SplitAddButton
                  selectedItem={selectedGrant}
                  deleteFunction={deleteGrant}
                  handleDeletion={handleDeletion}
                  // @ts-ignore
                  confirmMessage={`Are you sure you want to delete ${selectedGrant.title}?`}
                  confirmHeader="Delete Grant"
                  buttonLabel="New Grant">
                  <NewGrantForm />
                </SplitAddButton>
              )}
              {!selectedGrant && (
                <AddButton header="+ New Grant" buttonLabel="New Grant">
                  <NewGrantForm />
                </AddButton>
              )}
            </Feed>
            <InfoView header="Details" saving={saving}>
              <GrantInfo selectedItem={selectedGrant} setSaving={setSaving} />
            </InfoView>
            <MobileInfoView header="Details" saving={saving}>
              <GrantInfo selectedItem={selectedGrant} setSaving={setSaving} />
            </MobileInfoView>
          </>
        )}
      </Container>
    </Layout>
  );
}
