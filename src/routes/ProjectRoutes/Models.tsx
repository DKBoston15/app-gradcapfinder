import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/models.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewModelForm from '../../components/Projects/Models/AddModelForm/NewModelForm';
import { useModelsStore } from '../../stores/modelsStore';
import ModelInfo from '../../components/Projects/Models/ModelInfo/ModelInfo';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';

const options = {
  keys: ['title'],
};

export default function Models({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const models = useModelsStore((state: any) => state.models);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteModel = useModelsStore((state: any) => state.deleteModel);
  const [loading, setLoading] = useState(true);
  const getModels = useModelsStore((state: any) => state.getModels);

  useEffect(() => {
    const getData = async () => {
      await getModels(selectedProject);
    };
    getData();
  }, []);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (models.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const modelId = searchParams.get('modelId');
        if (models && modelId) {
          const filteredModel = models.filter((model: any) => model.id == modelId);
          setSelectedItem(filteredModel[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject, models]);

  useEffect(() => {
    setLoading(false);
    setLoading(true);
    setLoading(false);
  }, [models]);

  const handleDeletion = () => {
    setSelectedItem(models[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={models}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Models"
            searchQueryTitle="modelId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Model">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteModel}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Model"
                buttonLabel="New Model">
                <NewModelForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Model" buttonLabel="New Model">
                <NewModelForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <ModelInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
          <MobileInfoView header="Details" saving={saving}>
            <ModelInfo selectedItem={selectedItem} setSaving={setSaving} />
          </MobileInfoView>
        </>
      )}
    </Container>
  );
}
