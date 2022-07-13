import { Button } from 'primereact/button';
import React from 'react';
import { CustomDialog } from './styles';

export default function AddItemDialog(props: any) {
  const onHide = () => {
    props.setDisplayPrompt(false);
  };

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
          label="Create"
          icon="pi pi-check"
          onClick={() => props.addFunction()}
          autoFocus
          className="p-button-success p-button-sm"
        />
      </div>
    );
  };
  return (
    <>
      <CustomDialog
        header={props.header}
        visible={props.displayPrompt}
        footer={renderFooter()}
        onHide={() => onHide()}>
        {props.children}
      </CustomDialog>
    </>
  );
}
