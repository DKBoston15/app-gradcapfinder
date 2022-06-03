import React, { useEffect, useState } from 'react';
import { useLiteratureStore } from '@app/stores/literatureStore';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import LiteratureInfo from '@app/components/Projects/Literature/LiteratureInfo/LiteratureInfo';
import { Container } from './RouteStyles/literature.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewLiteratureForm from '../../components/Projects/Literature/AddLiteratureForm/NewLiteratureForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';

const options = {
  keys: ['title'],
};

export default function Literature({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const getLiterature = useLiteratureStore((state: any) => state.getLiterature);
  const literature = useLiteratureStore((state: any) => state.literature);
  const [selectedLiterature, setSelectedLiterature] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteLiterature = useLiteratureStore((state: any) => state.deleteLiterature);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await getLiterature(selectedProject);
    };
    getData();
  }, [selectedProject]);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (literature.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const literatureId = searchParams.get('literatureId');
        if (literature && literatureId) {
          const filteredLiterature = literature.filter(
            (literature: any) => literature.id == literatureId,
          );
          setSelectedLiterature(filteredLiterature[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject, literature]);

  useEffect(() => {
    setLoading(false);
    setLoading(true);
    setLoading(false);
  }, [literature]);

  const handleDeletion = () => {
    setSelectedLiterature(literature[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={literature}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Literature"
            searchQueryTitle="literatureId"
          />
          <Feed selectedItem={selectedLiterature} header="Pick Literature">
            {selectedLiterature && (
              <SplitAddButton
                selectedItem={selectedLiterature}
                deleteFunction={deleteLiterature}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedLiterature.title}?`}
                confirmHeader="Delete Literature"
                buttonLabel="New Literature">
                <NewLiteratureForm />
              </SplitAddButton>
            )}
            {!selectedLiterature && (
              <AddButton header="+ New Literature" buttonLabel="New Literature">
                <NewLiteratureForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <LiteratureInfo selectedLiterature={selectedLiterature} setSaving={setSaving} />
          </InfoView>
          <MobileInfoView header="Details" saving={saving}>
            <LiteratureInfo selectedLiterature={selectedLiterature} setSaving={setSaving} />
          </MobileInfoView>
        </>
      )}
    </Container>
  );
}
