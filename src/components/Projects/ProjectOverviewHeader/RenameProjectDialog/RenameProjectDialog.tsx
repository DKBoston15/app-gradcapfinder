import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import RenameProjectForm from '../RenameProjectForm/RenameProjectForm';
import { useProjectStore } from '@app/stores/projectStore';
import { Toast } from 'primereact/toast';
import { Project } from '@app/types/index';

interface RenameProjectDialogProps {
  displayPrompt: boolean;
  setDisplayPrompt: (value: boolean) => void;
}

export default function RenameProjectDialog({
  displayPrompt,
  setDisplayPrompt,
}: RenameProjectDialogProps) {
  const projects = useProjectStore((state: any) => state.projects);
  const selectedProjectName = useProjectStore((state: any) => state.selectedProjectName);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const [name, setName] = useState(selectedProjectName);
  const [description, setDescription] = useState('');
  const updateProject = useProjectStore((state: any) => state.updateProject);
  const toast = useRef(null);
  const onHide = () => {
    setDisplayPrompt(false);
  };
  const notify = (name: string, description: string) => {
    // @ts-ignore
    toast.current.show({
      severity: 'success',
      summary: `${name} Renamed`,
      detail: `${description}`,
      life: 3000,
    });
  };
  const renameProject = () => {
    const updateProjectAsync = async () => {
      await updateProject(selectedProject, name, description);
      setName('');
      setDescription('');
      notify(name, description);
      onHide();
    };
    updateProjectAsync();
  };

  useEffect(() => {
    if (projects.length > 0 && selectedProject) {
      const scopedSelectedProject = projects.filter(
        (project: Project) => project.id === selectedProject,
      );

      if (scopedSelectedProject.length > 0) {
        setName(scopedSelectedProject[0].name);
        setDescription(scopedSelectedProject[0].description);
      }
    }
  }, [selectedProject, projects]);

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide()}
          className="p-button-danger p-button-sm"
        />
        <Button
          label="Rename"
          icon="pi pi-check"
          onClick={() => renameProject()}
          autoFocus
          className="p-button-success p-button-sm"
        />
      </div>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Rename Project"
        visible={displayPrompt}
        style={{ width: '20vw' }}
        footer={renderFooter()}
        onHide={() => onHide()}>
        <RenameProjectForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />
      </Dialog>
    </>
  );
}
