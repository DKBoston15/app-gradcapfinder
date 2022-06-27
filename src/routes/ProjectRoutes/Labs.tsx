import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewLabForm from '../../components/Projects/Labs/AddLabForm/NewLabForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import { useLabsStore } from '@app/stores/labsStore';
import LabInfo from '@app/components/Projects/Labs/LabInfo/LabInfo';

const options = {
  keys: ['title'],
};

export default function Labs() {
  const [saving, setSaving] = useState(false);
  const [selectedLab, setSelectedLab] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectLabs, setProjectLabs] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { labs, deleteLab } = useLabsStore((state) => ({
    labs: state.labs,
    deleteLab: state.deleteLab,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredLabs = labs.filter((lab) => lab.id == id);
    setSelectedLab(filteredLabs[0]);
  }, [id, labs]);

  useEffect(() => {
    const filteredProjectLabs = labs.filter((lab) => lab.project_id == projectId);
    setProjectLabs(filteredProjectLabs);
    setLoading(false);
  }, [projectId, labs]);

  const handleDeletion = () => {
    deleteLab(projectId);
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
              items={projectLabs}
              selectedProject={projectId}
              options={options}
              header="Labs"
              title="labs"
            />
            <Feed selectedItem={selectedLab} header="Pick a Lab">
              {selectedLab && (
                <SplitAddButton
                  selectedItem={selectedLab}
                  deleteFunction={deleteLab}
                  handleDeletion={handleDeletion}
                  // @ts-ignore
                  confirmMessage={`Are you sure you want to delete ${selectedLab.title}?`}
                  confirmHeader="Delete Lab"
                  buttonLabel="New Lab">
                  <NewLabForm />
                </SplitAddButton>
              )}
              {!selectedLab && (
                <AddButton header="+ New Lab" buttonLabel="New Lab">
                  <NewLabForm />
                </AddButton>
              )}
            </Feed>
            <InfoView header="Details" saving={saving}>
              <LabInfo selectedItem={selectedLab} setSaving={setSaving} />
            </InfoView>
            <MobileInfoView header="Details" saving={saving}>
              <LabInfo selectedItem={selectedLab} setSaving={setSaving} />
            </MobileInfoView>
          </>
        )}
      </Container>
    </Layout>
  );
}
