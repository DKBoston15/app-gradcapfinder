import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewModelForm from '../../components/Projects/Models/AddModelForm/NewModelForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import { useModelsStore } from '@app/stores/modelsStore';
import ModelInfo from '@app/components/Projects/Models/ModelInfo/ModelInfo';

const options = {
  keys: ['title'],
};

export default function Models() {
  const [saving, setSaving] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectModels, setProjectModels] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { models, deleteModel } = useModelsStore((state) => ({
    models: state.models,
    deleteModel: state.deleteModel,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredModels = models.filter((model) => model.id == id);
    setSelectedModel(filteredModels[0]);
  }, [id]);

  useEffect(() => {
    const filteredProjectModels = models.filter((model) => model.project_id == projectId);
    setProjectModels(filteredProjectModels);
    setLoading(false);
  }, [projectId]);

  const handleDeletion = () => {
    deleteModel(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };
  return (
    <Layout>
      <Container>
        <ProjectNavBar />
        <MobileBottomNavBar />
        {!loading && (
          <>
            <InfoNavBar
              items={projectModels}
              selectedProject={projectId}
              options={options}
              header="Models"
              title="models"
            />
            <Feed selectedItem={selectedModel} header="Pick a Model">
              {selectedModel && (
                <SplitAddButton
                  selectedItem={selectedModel}
                  deleteFunction={deleteModel}
                  handleDeletion={handleDeletion}
                  // @ts-ignore
                  confirmMessage={`Are you sure you want to delete ${selectedModel.title}?`}
                  confirmHeader="Delete Model"
                  buttonLabel="New Model">
                  <NewModelForm />
                </SplitAddButton>
              )}
              {!selectedModel && (
                <AddButton header="+ New Model" buttonLabel="New Model">
                  <NewModelForm />
                </AddButton>
              )}
            </Feed>
            <InfoView header="Details" saving={saving}>
              <ModelInfo selectedItem={selectedModel} setSaving={setSaving} />
            </InfoView>
            <MobileInfoView header="Details" saving={saving}>
              <ModelInfo selectedItem={selectedModel} setSaving={setSaving} />
            </MobileInfoView>
          </>
        )}
      </Container>
    </Layout>
  );
}
