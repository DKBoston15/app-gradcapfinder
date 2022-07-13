import React, { useEffect, useState } from 'react';
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
} from './styles/projects.styles';
import AddProjectDialog from '@app/components/Projects/ProjectOverviewHeader/AddProjectDialog/AddProjectDialog';
import ProjectSelection from '@app/components/Projects/ProjectSelection/ProjectSelection';

export default function Projects() {
  const [projectsFound, setProjectsFound] = useState(true);
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [loading, setLoading] = useState(true);
  const projects = useProjectStore((state: any) => state.projects);
  useEffect(() => {
    if (projects.length > 0) {
      setProjectsFound(true);
      setLoading(false);
    }
  }, [projects]);

  const save = () => {
    setDisplayPrompt(true);
  };

  const items = [];

  return (
    <div>
      {!loading && (
        <Container>
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
