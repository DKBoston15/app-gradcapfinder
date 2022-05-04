import React, { useState, useRef } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { confirmDialog } from 'primereact/confirmdialog';
import AddItemDialog from '../AddItemDialog/AddItemDialog';
import { Toast } from 'primereact/toast';

export default function SplitAddButton(props: any) {
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const childCreateItem = useRef();
  const toast = useRef(null);

  const notify = (name: string, description?: string) => {
    // @ts-ignore
    toast.current.show({
      severity: 'success',
      summary: `${name} Created`,
      detail: `${description || ''}`,
      life: 3000,
    });
  };

  const deleteHandler = async () => {
    await props.deleteFunction(props.selectedItem.id);
    props.handleDeletion();
  };

  const confirm = () => {
    confirmDialog({
      message: props.confirmMessage,
      header: props.confirmHeader,
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteHandler(),
      reject: () => setDisplayPrompt(false),
    });
  };

  const items = [
    {
      label: props.confirmHeader,
      icon: 'pi pi-times',
      command: () => {
        confirm();
      },
    },
  ];

  const save = () => {
    setDisplayPrompt(true);
  };

  const addItem = async () => {
    // @ts-ignore
    await childCreateItem.current.childAddItem();
    setDisplayPrompt(false);
    notify(props.buttonLabel);
  };

  return (
    <>
      <Toast ref={toast} />
      <AddItemDialog
        setDisplayPrompt={setDisplayPrompt}
        displayPrompt={displayPrompt}
        header={props.buttonLabel}
        addFunction={addItem}>
        {React.cloneElement(props.children, { ref: childCreateItem })}
      </AddItemDialog>
      <SplitButton
        label={props.buttonLabel}
        icon="pi pi-plus"
        onClick={save}
        model={items}
        className="p-button-sm"></SplitButton>
    </>
  );
}
