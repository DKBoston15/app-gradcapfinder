import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/key_terms.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewKeyTermForm from '../../components/Projects/KeyTerms/AddKeyTermForm/NewKeyTermForm';
import { useKeyTermStore } from '../../stores/keytermStore';
import KeyTermInfo from '../../components/Projects/KeyTerms/KeyTermInfo/KeyTermInfo';

const options = {
  keys: ['title'],
};

export default function KeyTerms({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const keyTerms = useKeyTermStore((state: any) => state.keyTerms);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteKeyTerm = useKeyTermStore((state: any) => state.deleteKeyTerm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (keyTerms.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const keyTermId = searchParams.get('keyTermId');
        if (keyTerms && keyTermId) {
          const filteredKeyTerm = keyTerms.filter((keyTerm: any) => keyTerm.id == keyTermId);
          setSelectedItem(filteredKeyTerm[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject]);

  const handleDeletion = () => {
    setSelectedItem(keyTerms[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={keyTerms}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Key Terms"
            searchQueryTitle="keyTermId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Key Term">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteKeyTerm}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Key Term"
                buttonLabel="New Key Term">
                <NewKeyTermForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Key Term" buttonLabel="New Key Term">
                <NewKeyTermForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Key Term Info" saving={saving}>
            <KeyTermInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
