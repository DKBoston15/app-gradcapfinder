import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import React from 'react';

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
      <Dialog
        header={props.header}
        visible={props.displayPrompt}
        style={{ width: '30vw' }}
        footer={renderFooter()}
        onHide={() => onHide()}>
        {props.children}
      </Dialog>
    </>
  );
}
