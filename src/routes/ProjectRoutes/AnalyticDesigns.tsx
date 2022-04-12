import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/analytic_designs.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewAnalyticDesignForm from '../../components/Projects/AnalyticDesigns/AddAnalyticDesignForm/NewAnalyticDesignForm';
import { useAnalyticDesignsStore } from '../../stores/analyticDesignsStore';
import AnalyticDesignInfo from '../../components/Projects/AnalyticDesigns/AnalyticDesignInfo/AnalyticDesignInfo';

const options = {
  keys: ['title'],
};

export default function AnalyticDesigns({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const analytic_designs = useAnalyticDesignsStore((state: any) => state.analytic_designs);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteAnalyticDesign = useAnalyticDesignsStore((state: any) => state.deleteAnalyticDesign);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (analytic_designs.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const analyticDesignId = searchParams.get('analyticDesignId');
        if (analytic_designs && analyticDesignId) {
          const filteredAnalyticDesign = analytic_designs.filter(
            (analytic_design: any) => analytic_design.id == analyticDesignId,
          );
          setSelectedItem(filteredAnalyticDesign[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject]);

  const handleDeletion = () => {
    setSelectedItem(analytic_designs[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={analytic_designs}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Designs"
            searchQueryTitle="analyticDesignId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Design">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteAnalyticDesign}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Design"
                buttonLabel="New Design">
                <NewAnalyticDesignForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Design" buttonLabel="New Design">
                <NewAnalyticDesignForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Design Info" saving={saving}>
            <AnalyticDesignInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
