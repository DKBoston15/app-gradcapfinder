import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/sampling_techniques.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewSamplingTechniqueForm from '../../components/Projects/SamplingTechniques/AddSamplingTechniqueForm/NewSamplingTechniqueForm';
import { useSamplingTechniquesStore } from '../../stores/samplingTechniquesStore';
import SamplingTechniqueInfo from '../../components/Projects/SamplingTechniques/SamplingTechniqueInfo/SamplingTechniqueInfo';

const options = {
  keys: ['title'],
};

export default function SamplingTechniques({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const sampling_techniques = useSamplingTechniquesStore((state: any) => state.sampling_techniques);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteSamplingTechnique = useSamplingTechniquesStore(
    (state: any) => state.deleteSamplingTechnique,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (sampling_techniques.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const samplingTechniqueId = searchParams.get('samplingTechniqueId');
        if (sampling_techniques && samplingTechniqueId) {
          const filteredSamplingTechnique = sampling_techniques.filter(
            (sampling_technique: any) => sampling_technique.id == samplingTechniqueId,
          );
          setSelectedItem(filteredSamplingTechnique[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject]);

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={sampling_techniques}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Sampling Techniques"
            searchQueryTitle="samplingTechniqueId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Sampling Technique">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteSamplingTechnique}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Sampling Technique"
                buttonLabel="New Sampling Technique">
                <NewSamplingTechniqueForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Sampling Technique" buttonLabel="New Sampling Technique">
                <NewSamplingTechniqueForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Sampling Technique Info" saving={saving}>
            <SamplingTechniqueInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
