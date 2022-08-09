import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import NewProjectForm from '../NewProjectForm/NewProjectForm';
import { useProjectStore } from '@app/stores/projectStore';
import { Toast } from 'primereact/toast';
import { CustomDialog } from './styles';
import { useNavigate } from 'react-router-dom';

interface AddProjectDialogProps {
  displayPrompt: boolean;
  setDisplayPrompt: (value: boolean) => void;
}

export default function AddProjectDialog({
  displayPrompt,
  setDisplayPrompt,
}: AddProjectDialogProps) {
  const [name, setName] = useState('');
  const addProject = useProjectStore((state: any) => state.addProject);
  const toast = useRef(null);
  const navigate = useNavigate();
  const onHide = () => {
    setDisplayPrompt(false);
  };
  const notify = (name: string) => {
    // @ts-ignore
    toast.current.show({
      severity: 'success',
      summary: `${name} Created`,
      detail: ``,
      life: 3000,
    });
  };
  const createProject = () => {
    const addProjectAsync = async () => {
      const projectId = await addProject(name);
      setName('');
      notify(name);
      onHide();
      // navigate(`/projects/${projectId}/overview`);
    };
    addProjectAsync();
  };
  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Create"
          icon="pi pi-check"
          onClick={() => createProject()}
          autoFocus
          className="p-button-success p-button-sm"
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide()}
          className="p-button-danger p-button-sm"
        />
      </div>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <CustomDialog
        header="New Project"
        visible={displayPrompt}
        footer={renderFooter()}
        onHide={() => onHide()}>
        <NewProjectForm name={name} setName={setName} />
      </CustomDialog>
    </>
  );
}
