import React, { useState, useEffect } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { confirmDialog } from 'primereact/confirmdialog';
import AddProjectDialog from '../AddProjectDialog/AddProjectDialog';
import { useProjectStore } from '@app/stores/projectStore';
import RenameProjectDialog from '../RenameProjectDialog/RenameProjectDialog';
import { useParams } from 'react-router-dom';

export default function SplitAddProjectButton() {
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [renamePrompt, setRenamePrompt] = useState(false);
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState('');
  const { projects, deleteProject } = useProjectStore((state) => ({
    projects: state.projects,
    deleteProject: state.deleteProject,
  }));

  const deleteProjectHandler = async () => {
    await deleteProject(projectId);
  };

  useEffect(() => {
    const currentProject = projects.filter((project) => project.id == projectId);
    setProjectName(currentProject[0].name);
  }, [projects]);

  const confirm = () => {
    confirmDialog({
      message: `Are you sure you want to delete ${projectName}?`,
      header: 'Delete Project',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteProjectHandler(),
      reject: () => setDisplayPrompt(false),
    });
  };

  const items = [
    {
      label: 'Edit Project Info',
      icon: 'pi pi-pencil',
      command: () => {
        setRenamePrompt(true);
      },
    },
    {
      label: 'Delete Project',
      icon: 'pi pi-times',
      command: () => {
        confirm();
      },
    },
  ];

  const save = () => {
    setDisplayPrompt(true);
  };

  return (
    <div className="newProjectButton">
      <AddProjectDialog setDisplayPrompt={setDisplayPrompt} displayPrompt={displayPrompt} />
      <RenameProjectDialog setDisplayPrompt={setRenamePrompt} displayPrompt={renamePrompt} />
      <SplitButton
        label="New Project"
        icon="pi pi-plus"
        onClick={save}
        model={items}
        className="p-button-sm"></SplitButton>
    </div>
  );
}
