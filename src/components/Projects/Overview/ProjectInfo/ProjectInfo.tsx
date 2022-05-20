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
  DescriptionContainer,
  DescriptionButtonContainer,
  EditIcon,
  DescriptionHeader,
} from './styles';
import { useProjectStore } from '@app/stores/projectStore';
import { useSearchParams } from 'react-router-dom';
import RenameProjectDialog from '../../ProjectOverviewHeader/RenameProjectDialog/RenameProjectDialog';

export default function ProjectInfo() {
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const getProjectInfo = useProjectStore((state: any) => state.getProjectInfo);
  const updateProjectDates = useProjectStore((state: any) => state.updateProjectDates);
  const completeProject = useProjectStore((state: any) => state.completeProject);
  const archiveProject = useProjectStore((state: any) => state.archiveProject);
  const [projectInfo, setProjectInfo] = useState();
  const [startDate, setStartDate] = useState(null);
  const setSelectedProject = useProjectStore((state: any) => state.setSelectedProject);
  const projects = useProjectStore((state: any) => state.projects);
  let [searchParams, setSearchParams] = useSearchParams();
  const [renamePrompt, setRenamePrompt] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getProjectInfo(selectedProject);
      setProjectInfo(data);
      const date = new Date(data.start_date);
      if (!date.toString().includes('Wed Dec 31 1969')) {
        setStartDate(date);
      }
    };
    getData();
  }, []);

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
    <GridItem>
      <RenameProjectDialog setDisplayPrompt={setRenamePrompt} displayPrompt={renamePrompt} />
      <Header>Project Info</Header>
      <Container>
        {projectInfo && (
          <>
            <DateContainer>
              <DateItem>
                <div>
                  <Icon className="pi pi-calendar-plus" />
                  Start Date
                </div>
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
              <DescriptionHeader>Project Description</DescriptionHeader>
              <DescriptionContainer>
                <span>{projectInfo.description}</span>
                <EditIcon className="pi pi-pencil" onClick={setRenamePrompt} />
              </DescriptionContainer>
            </DescriptionButtonContainer>
          </>
        )}
      </Container>
    </GridItem>
  );
}
