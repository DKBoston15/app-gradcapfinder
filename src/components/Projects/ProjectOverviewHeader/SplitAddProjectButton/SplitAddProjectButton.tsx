import React, { useState } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { confirmDialog } from 'primereact/confirmdialog';
import AddProjectDialog from '../AddProjectDialog/AddProjectDialog';
import { useProjectStore } from '@app/stores/projectStore';
import RenameProjectDialog from '../RenameProjectDialog/RenameProjectDialog';

export default function SplitAddProjectButton() {
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [renamePrompt, setRenamePrompt] = useState(false);
  const selectedProjectName = useProjectStore((state: any) => state.selectedProjectName);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const deleteProject = useProjectStore((state: any) => state.deleteProject);

  const deleteProjectHandler = async () => {
    await deleteProject(selectedProject);
  };

  const confirm = () => {
    confirmDialog({
      message: `Are you sure you want to delete ${selectedProjectName}?`,
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
    <>
      <AddProjectDialog setDisplayPrompt={setDisplayPrompt} displayPrompt={displayPrompt} />
      <RenameProjectDialog setDisplayPrompt={setRenamePrompt} displayPrompt={renamePrompt} />
      <SplitButton
        label="New Project"
        icon="pi pi-plus"
        onClick={save}
        model={items}
        className="p-button-sm"></SplitButton>
    </>
  );
}
