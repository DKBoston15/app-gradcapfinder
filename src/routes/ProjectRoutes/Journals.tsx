import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewJournalForm from '../../components/Projects/Journals/AddJournalForm/NewJournalForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import { useJournalStore } from '@app/stores/journalStore';
import JournalInfo from '@app/components/Projects/Journals/JournalInfo/JournalInfo';
import NavigationLayout from '@app/layouts/NavigationLayout';

const options = {
  keys: ['title'],
};

export default function Journals() {
  const [saving, setSaving] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectJournals, setProjectJournals] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { journals, deleteJournal } = useJournalStore((state) => ({
    journals: state.journals,
    deleteJournal: state.deleteJournal,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredJournals = journals.filter((journal) => journal.id == id);
    setSelectedJournal(filteredJournals[0]);
  }, [id, journals]);

  useEffect(() => {
    const filteredProjectJournals = journals.filter((journal) => journal.project_id == projectId);
    setProjectJournals(filteredProjectJournals);
    setLoading(false);
  }, [projectId, journals]);

  const handleDeletion = () => {
    deleteJournal(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };

  const [projectsFound, setProjectsFound] = useState(true);
  useEffect(() => {
    if (projects.length > 0) {
      if (projectId) {
        navigate(`/projects/${projectId}/journals`);
      } else {
        navigate(`/projects/${projects[0].id}/journals`);
      }
    } else {
      setProjectsFound(false);
    }
  }, [projects]);

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={projectJournals}
            selectedProject={projectId}
            options={options}
            header="Journals"
            title="journals"
          />
          <Feed selectedItem={selectedJournal} header="Pick a Journal">
            {selectedJournal && (
              <SplitAddButton
                selectedItem={selectedJournal}
                deleteFunction={deleteJournal}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedJournal.title}?`}
                confirmHeader="Delete Journal"
                buttonLabel="New Journal">
                <NewJournalForm />
              </SplitAddButton>
            )}
            {!selectedJournal && (
              <AddButton header="+ New Journal" buttonLabel="New Journal">
                <NewJournalForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <JournalInfo selectedItem={selectedJournal} setSaving={setSaving} />
          </InfoView>
          <MobileInfoView header="Details" saving={saving}>
            <JournalInfo selectedItem={selectedJournal} setSaving={setSaving} />
          </MobileInfoView>
        </>
      )}
    </Container>
  );
}
