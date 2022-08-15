import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useProjectStore } from '@app/stores/projectStore';
import { Toast } from 'primereact/toast';
import { CustomDialog } from './styles';
import useChecklistStore from '@app/stores/checklistStore';
import { InputText } from 'primereact/inputtext';

interface EditChecklistDialogProps {
  displayPrompt: boolean;
  setDisplayPrompt: (value: boolean) => void;
  id: any;
  passedName: string;
}

export default function EditChecklistDialog({
  displayPrompt,
  setDisplayPrompt,
  id,
  passedName,
}: EditChecklistDialogProps) {
  const [name, setName] = useState(passedName);
  const updateChecklistName = useChecklistStore((state: any) => state.updateChecklistName);
  const toast = useRef(null);
  const onHide = () => {
    setDisplayPrompt(false);
  };

  useEffect(() => {
    setName(passedName);
  }, [passedName]);

  const notify = (name: string) => {
    // @ts-ignore
    toast.current.show({
      severity: 'success',
      summary: `${name} Updated`,
      detail: ``,
      life: 3000,
    });
  };
  const updateChecklist = () => {
    const updateChecklistAsync = async () => {
      await updateChecklistName(id, name);
      setName('');
      notify(name);
      onHide();
    };
    updateChecklistAsync();
  };
  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Update"
          icon="pi pi-check"
          onClick={() => updateChecklist()}
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
        header="Edit Checklist"
        visible={displayPrompt}
        footer={renderFooter()}
        onHide={() => onHide()}>
        <InputText value={name} onChange={(e) => setName(e.target.value)} />
      </CustomDialog>
    </>
  );
}
