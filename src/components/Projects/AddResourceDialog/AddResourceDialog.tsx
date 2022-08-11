import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import NewProjectForm from '../NewResourceForm/NewResourceForm';
import { useProjectStore } from '@app/stores/projectStore';
import { Toast } from 'primereact/toast';
import { CustomDialog } from './styles';
import { useNavigate } from 'react-router-dom';
import { useResourceStore } from '@app/stores/resourceStore';
import NewResourceForm from '../NewResourceForm/NewResourceForm';

interface AddResourceDialogProps {
  displayPrompt: boolean;
  setDisplayPrompt: (value: boolean) => void;
  defaultSection: string;
}

export default function AddResourceDialog({
  displayPrompt,
  setDisplayPrompt,
  defaultSection,
}: AddResourceDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [section, setSection] = useState(defaultSection);
  const [link, setLink] = useState('');
  const addResource = useResourceStore((state: any) => state.addResource);
  const toast = useRef(null);
  const onHide = () => {
    setDisplayPrompt(false);
  };
  const notify = (name: string) => {
    // @ts-ignore
    toast.current.show({
      severity: 'success',
      summary: `${title} Created`,
      detail: ``,
      life: 3000,
    });
  };
  const createResource = () => {
    const addResourceAsync = async () => {
      await addResource(title, description, link, section);
      setTitle('');
      setDescription('');
      setSection('');
      setLink('');
      notify(title);
      onHide();
    };
    addResourceAsync();
  };
  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Create"
          icon="pi pi-check"
          onClick={() => createResource()}
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
        header="New Resource"
        visible={displayPrompt}
        footer={renderFooter()}
        onHide={() => onHide()}>
        <NewResourceForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          link={link}
          setLink={setLink}
          section={section}
          setSection={setSection}
        />
      </CustomDialog>
    </>
  );
}
