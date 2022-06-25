import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewResearchParadigmForm from '../../components/Projects/ResearchParadigms/AddResearchParadigmForm/NewResearchParadigmForm';
import { useResearchParadigmsStore } from '../../stores/researchParadigmsStore';
import ResearchParadigmInfo from '../../components/Projects/ResearchParadigms/ResearchParadigmInfo/ResearchParadigmInfo';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';

const options = {
  keys: ['title'],
};

export default function ResearchParadigms() {
  const [saving, setSaving] = useState(false);
  const [selectedResearchParadigm, setSelectedResearchParadigm] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectResearchParadigms, setProjectResearchParadigms] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { research_paradigms, deleteResearchParadigm } = useResearchParadigmsStore((state) => ({
    research_paradigms: state.research_paradigms,
    deleteResearchParadigm: state.deleteResearchParadigm,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredResearchParadigms = research_paradigms.filter(
      (research_paradigm) => research_paradigm.id == id,
    );
    setSelectedResearchParadigm(filteredResearchParadigms[0]);
  }, [id]);

  useEffect(() => {
    const filteredProjectResearchParadigms = research_paradigms.filter(
      (research_paradigm) => research_paradigm.project_id == projectId,
    );
    setProjectResearchParadigms(filteredProjectResearchParadigms);
    setLoading(false);
  }, [projectId]);

  const handleDeletion = () => {
    deleteResearchParadigm(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };
  return (
    <Layout>
      <Container>
        <ProjectNavBar />
        <MobileBottomNavBar />
        {!loading && (
          <>
            <InfoNavBar
              items={projectResearchParadigms}
              selectedProject={projectId}
              options={options}
              header="Research Paradigms"
              title="research_paradigms"
            />
            <Feed selectedItem={selectedResearchParadigm} header="Pick a Research Paradigm">
              {selectedResearchParadigm && (
                <SplitAddButton
                  selectedItem={selectedResearchParadigm}
                  deleteFunction={deleteResearchParadigm}
                  handleDeletion={handleDeletion}
                  // @ts-ignore
                  confirmMessage={`Are you sure you want to delete ${selectedResearchParadigm.title}?`}
                  confirmHeader="Delete Research Paradigm"
                  buttonLabel="New Research Paradigm">
                  <NewResearchParadigmForm />
                </SplitAddButton>
              )}
              {!selectedResearchParadigm && (
                <AddButton header="+ New Research Paradigm" buttonLabel="New Research Paradigm">
                  <NewResearchParadigmForm />
                </AddButton>
              )}
            </Feed>
            <InfoView header="Details" saving={saving}>
              <ResearchParadigmInfo selectedItem={selectedResearchParadigm} setSaving={setSaving} />
            </InfoView>
            <MobileInfoView header="Details" saving={saving}>
              <ResearchParadigmInfo selectedItem={selectedResearchParadigm} setSaving={setSaving} />
            </MobileInfoView>
          </>
        )}
      </Container>
    </Layout>
  );
}
