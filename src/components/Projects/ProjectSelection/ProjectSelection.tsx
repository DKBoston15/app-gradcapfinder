import { useProjectStore } from '@app/stores/projectStore';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import AddProjectDialog from '../ProjectOverviewHeader/AddProjectDialog/AddProjectDialog';
import ProjectItem from './ProjectItem/ProjectItem';
import { Container, ProjectGrid } from './styles';

export default function ProjectSelection() {
  const { projects } = useProjectStore((state) => ({
    projects: state.projects,
  }));
  const [displayPrompt, setDisplayPrompt] = useState(false);

  return (
    <Container>
      <AddProjectDialog setDisplayPrompt={setDisplayPrompt} displayPrompt={displayPrompt} />
      <Button
        label="+ New Project"
        className="p-button-sm"
        onClick={() => setDisplayPrompt(true)}
      />
      <ProjectGrid>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ProjectGrid>
    </Container>
  );
}
