import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import RenameProjectForm from '../RenameProjectForm/RenameProjectForm';
import { useProjectStore } from '@app/stores/projectStore';
import { Toast } from 'primereact/toast';
import { Project } from '@app/types/index';
import { CustomDialog } from './styles';
import { StringLiteralLike } from 'typescript';

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
  const updateProject = useProjectStore((state: any) => state.updateProject);
  const toast = useRef(null);
  const onHide = () => {
    setDisplayPrompt(false);
  };
  const notify = (name: string) => {
    // @ts-ignore
    toast.current.show({
      severity: 'success',
      summary: `${name} Renamed`,
      detail: ``,
      life: 3000,
    });
  };
  const renameProject = () => {
    const updateProjectAsync = async () => {
      await updateProject(selectedProject, name);
      setName('');
      notify(name);
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
      }
    }
  }, [selectedProject, projects]);

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-check"
          onClick={() => onHide()}
          className="p-button-danger p-button-sm"
        />
        <Button
          label="Accept Edit"
          icon="pi pi-times"
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
      <CustomDialog
        header="Edit Project Info"
        visible={displayPrompt}
        footer={renderFooter()}
        onHide={() => onHide()}>
        <RenameProjectForm name={name} setName={setName} />
      </CustomDialog>
    </>
  );
}
