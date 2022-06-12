import React, { useEffect, useState, useRef } from 'react';
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
} from './styles';
import { useProjectStore } from '@app/stores/projectStore';
import { useSearchParams } from 'react-router-dom';
import RenameProjectDialog from '../../ProjectOverviewHeader/RenameProjectDialog/RenameProjectDialog';
import { useDebouncedCallback } from 'use-debounce';

export default function ProjectInfo() {
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const getProjectInfo = useProjectStore((state: any) => state.getProjectInfo);
  const updateObjective = useProjectStore((state: any) => state.updateObjective);
  const updateActivity = useProjectStore((state: any) => state.updateActivity);
  const updateProduct = useProjectStore((state: any) => state.updateProduct);
  const updateProjectDates = useProjectStore((state: any) => state.updateProjectDates);
  const completeProject = useProjectStore((state: any) => state.completeProject);
  const archiveProject = useProjectStore((state: any) => state.archiveProject);
  const [projectInfo, setProjectInfo] = useState();
  const [startDate, setStartDate] = useState(null);
  const setSelectedProject = useProjectStore((state: any) => state.setSelectedProject);
  const projects = useProjectStore((state: any) => state.projects);
  let [searchParams, setSearchParams] = useSearchParams();
  const [renamePrompt, setRenamePrompt] = useState(false);

  const [projectObjectives, setProjectObjectives] = useState('');
  const [activities, setActivities] = useState('');
  const [products, setProducts] = useState('');

  useEffect(() => {
    const getData = async () => {
      const data = await getProjectInfo(selectedProject);
      setProjectInfo(data);
      setProjectObjectives(data.objectives);
      setActivities(data.activities);
      setProducts(data.products);
      const date = new Date(data.start_date);
      if (!date.toString().includes('Wed Dec 31 1969')) {
        setStartDate(date);
      }
    };
    getData();
  }, []);

  const saveObjective = useDebouncedCallback(async (value: string) => {
    await updateObjective(projectInfo.id, value);
  }, 500);

  const saveActivity = useDebouncedCallback(async (value: string) => {
    await updateActivity(projectInfo.id, value);
  }, 500);

  const saveProduct = useDebouncedCallback(async (value: string) => {
    await updateProduct(projectInfo.id, value);
  }, 500);

  const saveStartDate = async (date) => {
    await updateProjectDates(selectedProject, date);
  };

  const completeProjectFunc = async () => {
    await completeProject(selectedProject);
    const otherProjects = projects.filter((project: any) => project.id !== selectedProject);
    setSearchParams({
      projectId: otherProjects[0].id,
    });
    await setSelectedProject(otherProjects[0].id, otherProjects[0].name);
  };

  const archiveProjectFunc = async () => {
    await archiveProject(selectedProject);
    const otherProjects = projects.filter((project: any) => project.id !== selectedProject);
    setSearchParams({
      projectId: otherProjects[0].id,
    });
    await setSelectedProject(otherProjects[0].id, otherProjects[0].name);
  };

  return (
    <GridItem className="projectInfo">
      <RenameProjectDialog setDisplayPrompt={setRenamePrompt} displayPrompt={renamePrompt} />
      <Header>Project Info</Header>
      <Container>
        {projectInfo && (
          <>
            <DateContainer>
              <DateItem>
                <IconContainer>
                  <Icon className="pi pi-calendar-plus" />
                  Start Date
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
