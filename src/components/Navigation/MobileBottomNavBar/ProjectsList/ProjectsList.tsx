import { useProjectStore } from '@app/stores/projectStore';
import React from 'react';
import { Container, NavList, NavLink } from './styles';

export default function ProjectsList({ setVisibleBottom }: any) {
  const dropdownProjects = useProjectStore((state: any) => state.dropdownProjects);
  const setSelectedProject = useProjectStore((state: any) => state.setSelectedProject);

  const closeDropdown = async (id: any) => {
    await setSelectedProject(id);
    setVisibleBottom(false);
  };
  return (
    <Container>
      <NavList>
        {dropdownProjects.map((project: any) => (
          <NavLink
            onClick={() => closeDropdown(project.value)}
            to={`/projects/overview?projectId=${project.value}`}>
            {project.label}
          </NavLink>
        ))}
      </NavList>
    </Container>
  );
}
