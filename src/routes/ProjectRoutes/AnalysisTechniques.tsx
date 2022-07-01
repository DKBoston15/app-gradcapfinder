import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewAnalysisTechniqueForm from '../../components/Projects/AnalysisTechniques/AddAnalysisTechniqueForm/NewAnalysisTechniqueForm';
import { useAnalysisTechniquesStore } from '../../stores/analysisTechniquesStore';
import AnalysisTechniqueInfo from '../../components/Projects/AnalysisTechniques/AnalysisTechniqueInfo/AnalysisTechniqueInfo';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import Layout from '@app/layouts/Layout';
import { useProjectStore } from '@app/stores/projectStore';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationLayout from '@app/layouts/NavigationLayout';

const options = {
  keys: ['title'],
};

export default function AnalysisTechniques() {
  const [saving, setSaving] = useState(false);
  const [selectedAnalysisTechnique, setSelectedAnalysisTechnique] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectAnalysisTechniques, setProjectAnalysisTechniques] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { analysis_techniques, deleteAnalysisTechnique } = useAnalysisTechniquesStore((state) => ({
    analysis_techniques: state.analysis_techniques,
    deleteAnalysisTechnique: state.deleteAnalysisTechnique,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredAnalysisTechniques = analysis_techniques.filter(
      (analysis_technique) => analysis_technique.id == id,
    );
    setSelectedAnalysisTechnique(filteredAnalysisTechniques[0]);
  }, [id, analysis_techniques]);

  useEffect(() => {
    const filteredProjectAnalysisTechniques = analysis_techniques.filter(
      (analysis_technique) => analysis_technique.project_id == projectId,
    );
    setProjectAnalysisTechniques(filteredProjectAnalysisTechniques);
    setLoading(false);
  }, [id, projectId, analysis_techniques]);

  const handleDeletion = () => {
    deleteAnalysisTechnique(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };
  const [projectsFound, setProjectsFound] = useState(true);
  useEffect(() => {
    if (projects.length > 0) {
      if (projectId) {
        navigate(`/projects/${projectId}/analysis_techniques`);
      } else {
        navigate(`/projects/${projects[0].id}/analysis_techniques`);
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
            items={projectAnalysisTechniques}
            selectedProject={projectId}
            options={options}
            header="Analysis Techniques"
            title="analysis_techniques"
          />
          <Feed selectedItem={selectedAnalysisTechnique} header="Pick an Analysis Technique">
            {selectedAnalysisTechnique && (
              <SplitAddButton
                selectedItem={selectedAnalysisTechnique}
                deleteFunction={deleteAnalysisTechnique}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedAnalysisTechnique.title}?`}
                confirmHeader="Delete Analysis Technique"
                buttonLabel="New Analysis Technique">
                <NewAnalysisTechniqueForm />
              </SplitAddButton>
            )}
            {!selectedAnalysisTechnique && (
              <AddButton header="+ New Analysis Technique" buttonLabel="New Analysis Technique">
                <NewAnalysisTechniqueForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <AnalysisTechniqueInfo selectedItem={selectedAnalysisTechnique} setSaving={setSaving} />
          </InfoView>
          <MobileInfoView header="Details" saving={saving}>
            <AnalysisTechniqueInfo selectedItem={selectedAnalysisTechnique} setSaving={setSaving} />
          </MobileInfoView>
        </>
      )}
    </Container>
  );
}
