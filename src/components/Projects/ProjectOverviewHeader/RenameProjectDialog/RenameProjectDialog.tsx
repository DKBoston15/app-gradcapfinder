import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import RenameProjectForm from '../RenameProjectForm/RenameProjectForm';
import { useProjectStore } from '@app/stores/projectStore';
import { Toast } from 'primereact/toast';
import { Project } from '@app/types/index';
import { CustomDialog } from './styles';

interface RenameProjectDialogProps {
  displayPrompt: boolean;
  setDisplayPrompt: (value: boolean) => void;
  projectName: string;
  projectId: any;
}

export default function RenameProjectDialog({
  displayPrompt,
  setDisplayPrompt,
  projectName,
  projectId,
}: RenameProjectDialogProps) {
  const updateProjectName = useProjectStore((state: any) => state.updateProjectName);
  const [name, setName] = useState(projectName);
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
      await updateProjectName(projectId, name);
      setName('');
      notify(name);
      onHide();
    };
    updateProjectAsync();
  };

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
