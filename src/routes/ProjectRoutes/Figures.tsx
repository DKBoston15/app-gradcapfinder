import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/project_feed.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewFigureForm from '../../components/Projects/Figures/AddFigureForm/NewFigureForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import { useFigureStore } from '@app/stores/figureStore';
import FigureInfo from '@app/components/Projects/Figures/FigureInfo/FigureInfo';

const options = {
  keys: ['title'],
};

export default function Figures() {
  const [saving, setSaving] = useState(false);
  const [selectedFigure, setSelectedFigure] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectFigures, setProjectFigures] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { figures, deleteFigure } = useFigureStore((state) => ({
    figures: state.figures,
    deleteFigure: state.deleteFigure,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredFigures = figures.filter((figure) => figure.id == id);
    setSelectedFigure(filteredFigures[0]);
  }, [id, figures]);

  useEffect(() => {
    const filteredProjectFigures = figures.filter((figure) => figure.project_id == projectId);
    setProjectFigures(filteredProjectFigures);
    setLoading(false);
  }, [id, projectId, figures]);

  const handleDeletion = () => {
    deleteFigure(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };
  return (
    <Layout>
      <ProjectNavBar />
      <MobileBottomNavBar />
      <Container>
        {!loading && (
          <>
            <InfoNavBar
              items={projectFigures}
              selectedProject={projectId}
              options={options}
              header="Figures"
              title="figures"
            />
            <Feed selectedItem={selectedFigure} header="Pick a Figure">
              {selectedFigure && (
                <SplitAddButton
                  selectedItem={selectedFigure}
                  deleteFunction={deleteFigure}
                  handleDeletion={handleDeletion}
                  // @ts-ignore
                  confirmMessage={`Are you sure you want to delete ${selectedFigure.title}?`}
                  confirmHeader="Delete Figure"
                  buttonLabel="New Figure">
                  <NewFigureForm />
                </SplitAddButton>
              )}
              {!selectedFigure && (
                <AddButton header="+ New Figure" buttonLabel="New Figure">
                  <NewFigureForm />
                </AddButton>
              )}
            </Feed>
            <InfoView header="Details" saving={saving}>
              <FigureInfo selectedItem={selectedFigure} setSaving={setSaving} />
            </InfoView>
            <MobileInfoView header="Details" saving={saving}>
              <FigureInfo selectedItem={selectedFigure} setSaving={setSaving} />
            </MobileInfoView>
          </>
        )}
      </Container>
    </Layout>
  );
}
