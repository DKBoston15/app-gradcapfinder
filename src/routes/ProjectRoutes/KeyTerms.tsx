import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewKeyTermForm from '../../components/Projects/KeyTerms/AddKeyTermForm/NewKeyTermForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import { useKeyTermStore } from '@app/stores/keytermStore';
import KeyTermInfo from '@app/components/Projects/KeyTerms/KeyTermInfo/KeyTermInfo';
import NavigationLayout from '@app/layouts/NavigationLayout';

const options = {
  keys: ['name'],
};

export default function KeyTerms() {
  const [saving, setSaving] = useState(false);
  const [selectedKeyTerm, setSelectedKeyTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectKeyTerms, setProjectKeyTerms] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { keyTerms, deleteKeyTerm } = useKeyTermStore((state) => ({
    keyTerms: state.keyTerms,
    deleteKeyTerm: state.deleteKeyTerm,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredKeyTerms = keyTerms.filter((key_term) => key_term.id == id);
    setSelectedKeyTerm(filteredKeyTerms[0]);
  }, [id, keyTerms]);

  useEffect(() => {
    const filteredProjectKeyTerms = keyTerms.filter((key_term) => key_term.project_id == projectId);
    setProjectKeyTerms(filteredProjectKeyTerms);
    setLoading(false);
  }, [projectId, keyTerms]);

  const handleDeletion = () => {
    deleteKeyTerm(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };

  const [projectsFound, setProjectsFound] = useState(true);
  useEffect(() => {
    if (projects.length > 0) {
      if (projectId) {
        navigate(`/projects/${projectId}/key_terms`);
      } else {
        navigate(`/projects/${projects[0].id}/key_terms`);
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
            items={projectKeyTerms}
            selectedProject={projectId}
            options={options}
            header="Key Terms"
            title="key_terms"
          />
          <Feed selectedItem={selectedKeyTerm} header="Pick a Key Term">
            {selectedKeyTerm && (
              <SplitAddButton
                selectedItem={selectedKeyTerm}
                deleteFunction={deleteKeyTerm}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedKeyTerm.name}?`}
                confirmHeader="Delete Key Term"
                buttonLabel="New Key Term">
                <NewKeyTermForm />
              </SplitAddButton>
            )}
            {!selectedKeyTerm && (
              <AddButton header="+ New Key Term" buttonLabel="New Key Term">
                <NewKeyTermForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <KeyTermInfo selectedItem={selectedKeyTerm} setSaving={setSaving} />
          </InfoView>
          <MobileInfoView header="Details" saving={saving}>
            <KeyTermInfo selectedItem={selectedKeyTerm} setSaving={setSaving} />
          </MobileInfoView>
        </>
      )}
    </Container>
  );
}
