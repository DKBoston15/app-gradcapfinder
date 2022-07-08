import React, { useEffect, useState } from 'react';
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
  Container,
  CustomDataTable,
} from './styles/projects.styles';
import AddProjectDialog from '@app/components/Projects/ProjectOverviewHeader/AddProjectDialog/AddProjectDialog';
import ProjectSelection from '@app/components/Projects/ProjectSelection/ProjectSelection';
import SplitAddProjectButton from '@app/components/Projects/ProjectOverviewHeader/SplitAddProjectButton/SplitAddProjectButton';

export default function Projects() {
  const [projectsFound, setProjectsFound] = useState(true);
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [loading, setLoading] = useState(true);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();
  const { projectId } = useParams();
  useEffect(() => {
    if (projects.length > 0) {
      setProjectsFound(true);
      setLoading(false);
    }
    // if (projects.length > 0) {
    //   if (projectId) {
    //     setProjectsFound(true);
    //     setLoading(false);
    //   } else {
    //     navigate(`/projects/${projects[0].id}/overview`);
    //   }
    // } else {
    //   setProjectsFound(false);
    //   setLoading(false);
    // }
  }, [projects]);

  const save = () => {
    setDisplayPrompt(true);
  };

  const items = [];

  return (
    <div>
      {!loading && (
        <Container>
          {/* <CustomDataTable data={projects}></CustomDataTable> */}
          <ProjectSelection />
        </Container>
      )}
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
    </div>
  );
}
