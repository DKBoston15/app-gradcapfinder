import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/sampling_designs.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewSamplingDesignForm from '../../components/Projects/SamplingDesigns/AddSamplingDesignForm/NewSamplingDesignForm';
import { useSamplingDesignsStore } from '../../stores/samplingDesignsStore';
import SamplingDesignInfo from '../../components/Projects/SamplingDesigns/SamplingDesignInfo/SamplingDesignInfo';

const options = {
  keys: ['title'],
};

export default function SamplingDesigns({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const sampling_designs = useSamplingDesignsStore((state: any) => state.sampling_designs);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteSamplingDesign = useSamplingDesignsStore((state: any) => state.deleteSamplingDesign);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (sampling_designs.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const samplingDesignId = searchParams.get('samplingDesignId');
        if (sampling_designs && samplingDesignId) {
          const filteredSamplingDesign = sampling_designs.filter(
            (sampling_design: any) => sampling_design.id == samplingDesignId,
          );
          setSelectedItem(filteredSamplingDesign[0]);
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
            items={sampling_designs}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Sampling Designs"
            searchQueryTitle="samplingDesignId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Sampling Design">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteSamplingDesign}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Sampling Design"
                buttonLabel="New Sampling Design">
                <NewSamplingDesignForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Sampling Design" buttonLabel="New Sampling Design">
                <NewSamplingDesignForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Sampling Design Info" saving={saving}>
            <SamplingDesignInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
