import React from 'react';
import {
  TrashIcon,
  DeleteContainer,
  ParentContainer,
  DeleteItem,
  DeleteAction,
  ProjectItemContainer,
  Title,
  Objective,
  Name,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '@app/stores/projectStore';
import { Divider } from 'primereact/divider';

export default function ProjectItem({ project }) {
  const navigate = useNavigate();

  const { deleteProject } = useProjectStore((state) => ({
    deleteProject: state.deleteProject,
  }));

  return (
    <>
      {project.id != 0 && (
        <ParentContainer>
          <ProjectItemContainer onClick={() => navigate(`/projects/${project.id}/overview`)}>
            <Name>{project.name}</Name>
            <Divider />
            <Title>Objective:</Title>
            <Objective>{project.objectives}</Objective>
          </ProjectItemContainer>
          <DeleteContainer onClick={() => deleteProject(project.id)}>
            <DeleteItem>
              <DeleteAction>
                <TrashIcon className="pi pi-trash" />
                Delete Project
              </DeleteAction>
            </DeleteItem>
          </DeleteContainer>
        </ParentContainer>
      )}
    </>
  );
}
