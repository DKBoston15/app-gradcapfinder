import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import NewProjectForm from '../NewResourceForm/NewResourceForm';
import { useProjectStore } from '@app/stores/projectStore';
import { Toast } from 'primereact/toast';
import { CustomDialog } from './styles';
import { useNavigate } from 'react-router-dom';
import { useResourceStore } from '@app/stores/resourceStore';
import NewResourceForm from '../NewResourceForm/NewResourceForm';
import EditResourceForm from '../EditResourceForm/EditResourceForm';

interface EditResourceDialogProps {
  displayPrompt: boolean;
  setDisplayPrompt: (value: boolean) => void;
  defaultSection: string;
  resourceId: any;
  passedTitle: string;
  passedDescription: string;
  passedLink: string;
}

export default function EditResourceDialog({
  displayPrompt,
  setDisplayPrompt,
  defaultSection,
  resourceId,
  passedTitle,
  passedDescription,
  passedLink,
}: EditResourceDialogProps) {
  const [title, setTitle] = useState(passedTitle);
  const [description, setDescription] = useState(passedDescription);
  const [section, setSection] = useState(defaultSection);
  const [link, setLink] = useState(passedLink);
  const patchResource = useResourceStore((state: any) => state.patchResource);
  const toast = useRef(null);
  const onHide = () => {
    setDisplayPrompt(false);
  };
  const notify = (name: string) => {
    // @ts-ignore
    toast.current.show({
      severity: 'success',
      summary: `${title} Updated`,
      detail: ``,
      life: 3000,
    });
  };
  const createResource = () => {
    const addResourceAsync = async () => {
      await patchResource(resourceId, title, description, link, section);
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
        header="Edit Resource"
        visible={displayPrompt}
        footer={renderFooter()}
        onHide={() => onHide()}>
        <EditResourceForm
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
