import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import NewProjectForm from '../NewProjectForm/NewProjectForm';
import { useProjectStore } from '@app/stores/projectStore';
import { Toast } from 'primereact/toast';

interface AddProjectDialogProps {
  displayPrompt: boolean;
  setDisplayPrompt: (value: boolean) => void;
}

export default function AddProjectDialog({
  displayPrompt,
  setDisplayPrompt,
}: AddProjectDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const addProject = useProjectStore((state: any) => state.addProject);
  const toast = useRef(null);
  const onHide = () => {
    setDisplayPrompt(false);
  };
  const notify = (name: string, description: string) => {
    // @ts-ignore
    toast.current.show({
      severity: 'success',
      summary: `${name} Created`,
      detail: `${description}`,
      life: 3000,
    });
  };
  const createProject = () => {
    const addProjectAsync = async () => {
      await addProject(name, description);
      setName('');
      setDescription('');
      notify(name, description);
      onHide();
    };
    addProjectAsync();
  };
  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Create"
          icon="pi pi-times"
          onClick={() => createProject()}
          autoFocus
          className="p-button-success p-button-sm"
        />
        <Button
          label="Cancel"
          icon="pi pi-check"
          onClick={() => onHide()}
          className="p-button-danger p-button-sm"
        />
      </div>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="New Project"
        visible={displayPrompt}
        style={{ width: '20vw' }}
        footer={renderFooter()}
        onHide={() => onHide()}>
        <NewProjectForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />
      </Dialog>
    </>
  );
}
