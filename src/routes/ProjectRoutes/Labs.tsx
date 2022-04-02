import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/labs.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewLabForm from '../../components/Projects/Labs/AddLabForm/NewLabForm';
import { useLabsStore } from '../../stores/labsStore';
import LabInfo from '../../components/Projects/Labs/LabInfo/LabInfo';

const options = {
  keys: ['title'],
};

export default function Labs({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const labs = useLabsStore((state: any) => state.labs);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteLab = useLabsStore((state: any) => state.deleteLab);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (labs.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const labId = searchParams.get('labId');
        if (labs && labId) {
          const filteredLab = labs.filter((lab: any) => lab.id == labId);
          setSelectedItem(filteredLab[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject]);

  const handleDeletion = () => {
    setSelectedItem(labs[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={labs}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Labs"
            searchQueryTitle="labId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Lab">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteLab}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Lab"
                buttonLabel="New Lab">
                <NewLabForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Lab" buttonLabel="New Lab">
                <NewLabForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Lab Info" saving={saving}>
            <LabInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
