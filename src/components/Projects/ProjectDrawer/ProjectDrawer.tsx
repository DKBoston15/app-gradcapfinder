import React, { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
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
  ProjectName,
} from './styles';
import { useProjectStore } from '@app/stores/projectStore';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import RenameProjectDialog from '../ProjectOverviewHeader/RenameProjectDialog/RenameProjectDialog';

export default function ProjectDrawer({ visible, setVisible, selectedProjectId }: any) {
  const {
    projects,
    completeProject,
    archiveProject,
    updateObjective,
    updateActivity,
    updateProduct,
    updateProjectDate,
    deleteProject,
  } = useProjectStore((state) => ({
    projects: state.projects,
    completeProject: state.completeProject,
    archiveProject: state.archiveProject,
    updateObjective: state.updateObjective,
    updateActivity: state.updateActivity,
    updateProduct: state.updateProduct,
    updateProjectDate: state.updateProjectDate,
    deleteProject: state.deleteProject,
  }));

  const [startDate, setStartDate] = useState(null);
  const [renamePrompt, setRenamePrompt] = useState(false);
  const navigate = useNavigate();
  const [projectObjectives, setProjectObjectives] = useState('');
  const [activities, setActivities] = useState('');
  const [products, setProducts] = useState('');
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    const currentProject = projects.filter((project) => project.id == selectedProjectId);
    if (currentProject.length > 0) {
      setProjectObjectives(currentProject[0].objectives || '');
      setActivities(currentProject[0].activities || '');
      setProducts(currentProject[0].products || '');
      setProjectName(currentProject[0].name || '');
      const date = new Date(currentProject[0].start_date);
      if (!date.toString().includes('Wed Dec 31 1969')) {
        setStartDate(date);
      }
    }
  }, [projects, selectedProjectId]);

  const saveObjective = useDebouncedCallback(async (value: string) => {
    await updateObjective(selectedProjectId, value);
  }, 500);

  const saveActivity = useDebouncedCallback(async (value: string) => {
    await updateActivity(selectedProjectId, value);
  }, 500);

  const saveProduct = useDebouncedCallback(async (value: string) => {
    await updateProduct(selectedProjectId, value);
  }, 500);

  const saveStartDate = async (date) => {
    await updateProjectDate(selectedProjectId, date);
  };

  const completeProjectFunc = async () => {
    await completeProject(selectedProjectId);
    // const otherProjects = projects.filter((project: any) => project.id !== selectedProjectId);
    // navigate(`/projects/${otherProjects[0].id}/overview`);
  };

  const deleteProjectFunc = async () => {
    await deleteProject(selectedProjectId);
    // const otherProjects = projects.filter((project: any) => project.id !== selectedProjectId);
    // navigate(`/projects/${otherProjects[0].id}/overview`);
  };

  const truncatedName = (projectName: any) => {
    if (projectName.length > 30) {
      return `${projectName.substring(0, 25)}...`;
    }
    return projectName;
  };

  return (
    <>
      <RenameProjectDialog
        setDisplayPrompt={setRenamePrompt}
        displayPrompt={renamePrompt}
        projectName={projectName}
        projectId={selectedProjectId}
      />
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>
        <>
          <DateContainer>
            <DateItem>
              <ProjectName>
                <div>{truncatedName(projectName)}</div>
                <i
                  className="pi pi-pencil"
                  style={{ fontSize: '1rem', marginLeft: '0.5rem', cursor: 'pointer' }}
                  onClick={() => setRenamePrompt(true)}
                />
              </ProjectName>
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
              <RedButton onClick={() => deleteProjectFunc()}>Delete Project</RedButton>
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
      </Sidebar>
    </>
  );
}
