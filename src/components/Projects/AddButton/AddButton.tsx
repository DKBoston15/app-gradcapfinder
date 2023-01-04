import React, { useRef, useState } from 'react';
import { CustomButton } from './styles';
import AddItemDialog from '../AddItemDialog/AddItemDialog';

export default function AddButton(props: any) {
  const childCreateItem = useRef();
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const save = () => {
    setDisplayPrompt(true);
  };

  const notify = (name: string, description?: string) => {
    // @ts-ignore
    props.toast.current.show({
      severity: 'success',
      summary: `${name} Created`,
      detail: `${description || ''}`,
      life: 3000,
    });
  };

  const addItem = async () => {
    // @ts-ignore
    await childCreateItem.current.childAddItem();
    setDisplayPrompt(false);
    notify(props.buttonLabel);
  };

  return (
    <>
      <AddItemDialog
        setDisplayPrompt={setDisplayPrompt}
        displayPrompt={displayPrompt}
        header={props.buttonLabel}
        addFunction={addItem}>
        {React.cloneElement(props.children, { ref: childCreateItem })}
      </AddItemDialog>
      <CustomButton
        className="p-button-sm"
        onClick={() => save()}
        tooltip={`3-7 ${props.tooltipName} Max`}
        tooltipOptions={{ showOnDisabled: true, disabled: !props.disabled }}
        disabled={props.disabled}>
        {props.header}
      </CustomButton>
    </>
  );
}
