import React, { useEffect, useState } from 'react';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewAnalyticDesignForm from '../../components/Projects/AnalyticDesigns/AddAnalyticDesignForm/NewAnalyticDesignForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import Layout from '@app/layouts/Layout';
import { useProjectStore } from '@app/stores/projectStore';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnalyticDesignsStore } from '@app/stores/analyticDesignsStore';
import AnalyticDesignInfo from '@app/components/Projects/AnalyticDesigns/AnalyticDesignInfo/AnalyticDesignInfo';

const options = {
  keys: ['title'],
};

export default function AnalyticDesigns() {
  const [saving, setSaving] = useState(false);
  const [selectedAnalyticDesign, setSelectedAnalyticDesign] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectAnalyticDesigns, setProjectAnalyticDesigns] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { analytic_designs, deleteAnalyticDesign } = useAnalyticDesignsStore((state) => ({
    analytic_designs: state.analytic_designs,
    deleteAnalyticDesign: state.deleteAnalyticDesign,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredAnalyticDesigns = analytic_designs.filter(
      (analytic_design) => analytic_design.id == id,
    );
    setSelectedAnalyticDesign(filteredAnalyticDesigns[0]);
  }, [id]);

  useEffect(() => {
    const filteredProjectAnalyticDesigns = analytic_designs.filter(
      (analytic_design) => analytic_design.project_id == projectId,
    );
    setProjectAnalyticDesigns(filteredProjectAnalyticDesigns);
    setLoading(false);
  }, [projectId]);

  const handleDeletion = () => {
    deleteAnalyticDesign(projectId);
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
              items={projectAnalyticDesigns}
              selectedProject={projectId}
              options={options}
              header="Analytic Designs"
              title="analytic_designs"
            />
            <Feed selectedItem={selectedAnalyticDesign} header="Pick an Analytic Design">
              {selectedAnalyticDesign && (
                <SplitAddButton
                  selectedItem={selectedAnalyticDesign}
                  deleteFunction={deleteAnalyticDesign}
                  handleDeletion={handleDeletion}
                  // @ts-ignore
                  confirmMessage={`Are you sure you want to delete ${selectedAnalyticDesign.title}?`}
                  confirmHeader="Delete Analytic Design"
                  buttonLabel="New Analytic Design">
                  <NewAnalyticDesignForm />
                </SplitAddButton>
              )}
              {!selectedAnalyticDesign && (
                <AddButton header="+ New Analytic Design" buttonLabel="New Analytic Design">
                  <NewAnalyticDesignForm />
                </AddButton>
              )}
            </Feed>
            <InfoView header="Details" saving={saving}>
              <AnalyticDesignInfo selectedItem={selectedAnalyticDesign} setSaving={setSaving} />
            </InfoView>
            <MobileInfoView header="Details" saving={saving}>
              <AnalyticDesignInfo selectedItem={selectedAnalyticDesign} setSaving={setSaving} />
            </MobileInfoView>
          </>
        )}
      </Container>
    </Layout>
  );
}
