import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewSamplingForm from '../../components/Projects/Sampling/AddSamplingForm/NewSamplingForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import { useSamplingStore } from '@app/stores/samplingStore';
import SamplingInfo from '@app/components/Projects/Sampling/SamplingInfo/SamplingInfo';
import NavigationLayout from '@app/layouts/NavigationLayout';

const options = {
  keys: ['title'],
};

export default function Samplings() {
  const [saving, setSaving] = useState(false);
  const [selectedSampling, setSelectedSampling] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectSamplings, setProjectSamplings] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { samplings, deleteSampling } = useSamplingStore((state) => ({
    samplings: state.samplings,
    deleteSampling: state.deleteSampling,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredSamplings = samplings.filter((sample) => sample.id == id);
    setSelectedSampling(filteredSamplings[0]);
  }, [id, samplings]);

  useEffect(() => {
    const filteredProjectSamplings = samplings.filter((sample) => sample.project_id == projectId);
    setProjectSamplings(filteredProjectSamplings);
    setLoading(false);
  }, [id, projectId, samplings]);

  const handleDeletion = () => {
    deleteSampling(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };

  const [projectsFound, setProjectsFound] = useState(true);
  useEffect(() => {
    if (projects.length > 0) {
      if (projectId) {
        navigate(`/projects/${projectId}/sampling`);
      } else {
        navigate(`/projects/${projects[0].id}/sampling`);
      }
    } else {
      setProjectsFound(false);
    }
  }, [projects]);

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={projectSamplings}
            selectedProject={projectId}
            options={options}
            header="Sampling"
            title="sampling"
          />
          <Feed selectedItem={selectedSampling} header="Pick a Sampling">
            {selectedSampling && (
              <SplitAddButton
                selectedItem={selectedSampling}
                deleteFunction={deleteSampling}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedSampling.title}?`}
                confirmHeader="Delete Sampling"
                buttonLabel="New Sampling">
                <NewSamplingForm />
              </SplitAddButton>
            )}
            {!selectedSampling && (
              <AddButton header="+ New Sampling" buttonLabel="New Sampling">
                <NewSamplingForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <SamplingInfo selectedItem={selectedSampling} setSaving={setSaving} />
          </InfoView>
          <MobileInfoView header="Details" saving={saving}>
            <SamplingInfo selectedItem={selectedSampling} setSaving={setSaving} />
          </MobileInfoView>
        </>
      )}
    </Container>
  );
}
