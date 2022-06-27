import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import ProjectNavBar from '../components/Navigation/ProjectNavBar/ProjectNavBar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '@app/stores/projectStore';
import GridLoader from 'react-spinners/GridLoader';
import {
  SpinnerContainer,
  NotFoundContainer,
  IntroContainer,
  Title,
  Paragraph,
  ButtonContainer,
  CustomButton,
} from './styles/projects.styles';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import AddProjectDialog from '@app/components/Projects/ProjectOverviewHeader/AddProjectDialog/AddProjectDialog';

export default function Projects() {
  const [projectsFound, setProjectsFound] = useState(true);
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [loading, setLoading] = useState(true);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();
  const { projectId } = useParams();
  useEffect(() => {
    if (projects.length > 0) {
      if (projectId) {
        setProjectsFound(true);
        setLoading(false);
      } else {
        navigate(`/projects/${projects[0].id}/overview`);
      }
    } else {
      setProjectsFound(false);
      setLoading(false);
    }
  }, [projects]);

  const save = () => {
    setDisplayPrompt(true);
  };

  return (
    <Layout>
      <ProjectNavBar />
      <MobileBottomNavBar />
      {loading && (
        <SpinnerContainer>
          <GridLoader size={30} color="#2381fe" />
        </SpinnerContainer>
      )}
      {!projectsFound && (
        <NotFoundContainer>
          <AddProjectDialog setDisplayPrompt={setDisplayPrompt} displayPrompt={displayPrompt} />
          <IntroContainer>
            <Title>Welcome to Projects</Title>
            <Paragraph>
              To get started, click below to create a project! <br />
            </Paragraph>
            <ButtonContainer>
              <CustomButton onClick={save}>Add Project</CustomButton>
            </ButtonContainer>
          </IntroContainer>
        </NotFoundContainer>
      )}
    </Layout>
  );
}
