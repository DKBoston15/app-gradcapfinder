import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/analysis_techniques.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewAnalysisTechniqueForm from '../../components/Projects/AnalysisTechniques/AddAnalysisTechniqueForm/NewAnalysisTechniqueForm';
import { useAnalysisTechniquesStore } from '../../stores/analysisTechniquesStore';
import AnalysisTechniqueInfo from '../../components/Projects/AnalysisTechniques/AnalysisTechniqueInfo/AnalysisTechniqueInfo';

const options = {
  keys: ['title'],
};

export default function AnalysisTechniques({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const analysis_techniques = useAnalysisTechniquesStore((state: any) => state.analysis_techniques);
  const getAnalysisTechniques = useAnalysisTechniquesStore(
    (state: any) => state.getAnalysisTechniques,
  );
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteAnalysisTechnique = useAnalysisTechniquesStore(
    (state: any) => state.deleteAnalysisTechnique,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await getAnalysisTechniques(selectedProject);
    };
    getData();
  }, []);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (analysis_techniques.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const analysisTechniqueId = searchParams.get('analysisTechniqueId');
        if (analysis_techniques && analysisTechniqueId) {
          const filteredAnalysisTechnique = analysis_techniques.filter(
            (analysis_technique: any) => analysis_technique.id == analysisTechniqueId,
          );
          setSelectedItem(filteredAnalysisTechnique[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject, analysis_techniques]);

  const handleDeletion = () => {
    setSelectedItem(analysis_techniques[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={analysis_techniques}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Techniques"
            searchQueryTitle="analysisTechniqueId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Technique">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteAnalysisTechnique}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Technique"
                buttonLabel="New Technique">
                <NewAnalysisTechniqueForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Technique" buttonLabel="New Technique">
                <NewAnalysisTechniqueForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <AnalysisTechniqueInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
