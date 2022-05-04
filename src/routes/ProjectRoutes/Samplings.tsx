import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/sampling_designs.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewSamplingForm from '../../components/Projects/Sampling/AddSamplingForm/NewSamplingForm';
import { useSamplingStore } from '../../stores/samplingStore';
import SamplingInfo from '../../components/Projects/Sampling/SamplingInfo/SamplingInfo';

const options = {
  keys: ['title'],
};

export default function Samplings({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const samplings = useSamplingStore((state: any) => state.samplings);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteSampling = useSamplingStore((state: any) => state.deleteSampling);
  const [loading, setLoading] = useState(true);
  const getSamplings = useSamplingStore((state: any) => state.getSamplings);

  useEffect(() => {
    const getData = async () => {
      await getSamplings(selectedProject);
    };
    getData();
  }, []);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (samplings.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const samplingId = searchParams.get('samplingId');
        if (samplings && samplingId) {
          const filteredSampling = samplings.filter((sampling: any) => sampling.id == samplingId);
          setSelectedItem(filteredSampling[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject, samplings]);

  const handleDeletion = () => {
    setSelectedItem(samplings[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={samplings}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Sampling"
            searchQueryTitle="samplingId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Sampling">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteSampling}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Sampling"
                buttonLabel="New Sampling">
                <NewSamplingForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Sampling" buttonLabel="New Sampling">
                <NewSamplingForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <SamplingInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
