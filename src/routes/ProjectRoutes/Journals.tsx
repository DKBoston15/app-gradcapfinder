import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/journals.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewJournalForm from '../../components/Projects/Journals/AddJournalForm/NewJournalForm';
import { useJournalStore } from '../../stores/journalStore';
import JournalInfo from '../../components/Projects/Journals/JournalInfo/JournalInfo';

const options = {
  keys: ['title'],
};

export default function Journals({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const getJournals = useJournalStore((state: any) => state.getJournals);
  const journals = useJournalStore((state: any) => state.journals);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteJournal = useJournalStore((state: any) => state.deleteJournal);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await getJournals(selectedProject);
    };
    getData();
  }, []);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (journals.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const journalId = searchParams.get('journalId');
        if (journals && journalId) {
          const filteredJournal = journals.filter((journal: any) => journal.id == journalId);
          setSelectedItem(filteredJournal[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject, journals]);

  const handleDeletion = () => {
    setSelectedItem(journals[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={journals}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Journals"
            searchQueryTitle="journalId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Journal">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteJournal}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Journal"
                buttonLabel="New Journal">
                <NewJournalForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Journal" buttonLabel="New Journal">
                <NewJournalForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <JournalInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
