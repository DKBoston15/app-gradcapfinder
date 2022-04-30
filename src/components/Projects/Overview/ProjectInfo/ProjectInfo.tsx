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
} from './styles';
import { useProjectStore } from '@app/stores/projectStore';
import { useSearchParams } from 'react-router-dom';

export default function ProjectInfo() {
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const getProjectInfo = useProjectStore((state: any) => state.getProjectInfo);
  const updateProjectDates = useProjectStore((state: any) => state.updateProjectDates);
  const completeProject = useProjectStore((state: any) => state.completeProject);
  const archiveProject = useProjectStore((state: any) => state.archiveProject);
  const [projectInfo, setProjectInfo] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const setSelectedProject = useProjectStore((state: any) => state.setSelectedProject);
  const projects = useProjectStore((state: any) => state.projects);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getProjectInfo(selectedProject);
      setProjectInfo(data);
      setStartDate(new Date(data.start_date));
      setEndDate(new Date(data.end_date));
    };
    getData();
  }, []);

  const saveStartDate = async (date) => {
    await updateProjectDates(selectedProject, date, endDate);
  };

  const saveEndDate = async (date) => {
    await updateProjectDates(selectedProject, startDate, date);
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
      <Header>Project Info</Header>
      <Container>
        <DateContainer>
          <DateItem>
            <Icon className="pi pi-calendar-plus" />
            Start Date
            <CustomCalendar
              value={startDate}
              onChange={(e) => {
                setStartDate(e.value);
                saveStartDate(e.value);
              }}
            />
          </DateItem>
          <DateItem>
            <Icon className="pi pi-calendar-minus" />
            End Date
            <CustomCalendar
              value={endDate}
              onChange={(e) => {
                setEndDate(e.value);
                saveEndDate(e.value);
              }}
            />
          </DateItem>
        </DateContainer>
        <ButtonContainer>
          <GreenButton onClick={() => completeProjectFunc()}>Complete Project</GreenButton>
          <RedButton onClick={() => archiveProjectFunc()}>Archive Project</RedButton>
        </ButtonContainer>
      </Container>
    </GridItem>
  );
}
