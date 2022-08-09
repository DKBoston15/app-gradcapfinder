import React, { useEffect, useState } from 'react';
import {
  GridItem,
  Header,
  ButtonContainer,
  DateContainer,
  Icon,
  DateItem,
  Container,
  CustomCalendar,
  GreenButton,
  RedButton,
  DescriptionButtonContainer,
  CustomTextarea,
  TextareaTitle,
  IconContainer,
  BlueButton,
} from './styles';
import { useProjectStore } from '@app/stores/projectStore';
import { useNavigate, useParams } from 'react-router-dom';
import RenameProjectDialog from '../../ProjectOverviewHeader/RenameProjectDialog/RenameProjectDialog';
import { useDebouncedCallback } from 'use-debounce';

export default function ProjectInfo() {
  const {
    projects,
    completeProject,
    archiveProject,
    updateObjective,
    updateActivity,
    updateProduct,
    updateProjectDate,
  } = useProjectStore((state) => ({
    projects: state.projects,
    completeProject: state.completeProject,
    archiveProject: state.archiveProject,
    updateObjective: state.updateObjective,
    updateActivity: state.updateActivity,
    updateProduct: state.updateProduct,
    updateProjectDate: state.updateProjectDate,
  }));

  const { projectId } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [renamePrompt, setRenamePrompt] = useState(false);
  const navigate = useNavigate();
  const [projectObjectives, setProjectObjectives] = useState('');
  const [activities, setActivities] = useState('');
  const [products, setProducts] = useState('');

  useEffect(() => {
    const currentProject = projects.filter((project) => project.id == projectId);
    if (currentProject.length > 0) {
      setProjectObjectives(currentProject[0].objectives || '');
      setActivities(currentProject[0].activities || '');
      setProducts(currentProject[0].products || '');
      const date = new Date(currentProject[0].start_date);
      if (!date.toString().includes('Wed Dec 31 1969')) {
        setStartDate(date);
      }
    }
  }, [projects, projectId]);

  const saveObjective = useDebouncedCallback(async (value: string) => {
    await updateObjective(projectId, value);
  }, 500);

  const saveActivity = useDebouncedCallback(async (value: string) => {
    await updateActivity(projectId, value);
  }, 500);

  const saveProduct = useDebouncedCallback(async (value: string) => {
    await updateProduct(projectId, value);
  }, 500);

  const saveStartDate = async (date) => {
    await updateProjectDate(projectId, date);
  };

  const completeProjectFunc = async () => {
    await completeProject(projectId);
    // const otherProjects = projects.filter((project: any) => project.id !== projectId);
    // navigate(`/projects/${otherProjects[0].id}/overview`);
  };

  const archiveProjectFunc = async () => {
    await archiveProject(projectId);
    // const otherProjects = projects.filter((project: any) => project.id !== projectId);
    // navigate(`/projects/${otherProjects[0].id}/overview`);
  };

  return (
    <GridItem className="projectInfo">
      <RenameProjectDialog setDisplayPrompt={setRenamePrompt} displayPrompt={renamePrompt} />
      <Header>Project Info</Header>
      <Container>
        {projects && (
          <>
            <DateContainer>
              <DateItem>
                <IconContainer>
                  <>
                    <Icon className="pi pi-calendar-plus" />
                    <span>Start Date</span>
                  </>
                </IconContainer>
                <CustomCalendar
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.value);
                    saveStartDate(e.value);
                  }}
                />
              </DateItem>
              <ButtonContainer>
                <GreenButton onClick={() => completeProjectFunc()}>Complete Project</GreenButton>
                <BlueButton onClick={() => navigate('/tasks')}>See Tasks</BlueButton>
                <RedButton onClick={() => archiveProjectFunc()}>Archive Project</RedButton>
              </ButtonContainer>
            </DateContainer>
            <DescriptionButtonContainer>
              <TextareaTitle>Project Objectives</TextareaTitle>
              <CustomTextarea
                rows={3}
                cols={30}
                value={projectObjectives}
                onChange={(e) => {
                  setProjectObjectives(event.target.value);
                  saveObjective(event.target.value);
                }}
              />
              <TextareaTitle>Activities</TextareaTitle>
              <CustomTextarea
                rows={3}
                cols={30}
                value={activities}
                onChange={(e) => {
                  setActivities(event.target.value);
                  saveActivity(event.target.value);
                }}
              />
              <TextareaTitle>Products</TextareaTitle>
              <CustomTextarea
                rows={3}
                cols={30}
                value={products}
                onChange={(e) => {
                  setProducts(event.target.value);
                  saveProduct(event.target.value);
                }}
              />
            </DescriptionButtonContainer>
          </>
        )}
      </Container>
    </GridItem>
  );
}
