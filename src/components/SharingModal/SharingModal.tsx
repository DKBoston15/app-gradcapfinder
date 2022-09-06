import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { CustomChips } from './styles';
import { useProfileStore } from '@app/stores/profileStore';
import { supabase } from '@app/supabase';
import { Toast } from 'primereact/toast';
import { useParams } from 'react-router-dom';

export default function SharingModal({ displaySharingDialog, setDisplaySharingDialog }) {
  const [sharedUsers, setSharedUsers] = useState([]);
  const toast = useRef(null);
  const user = supabase.auth.user();

  const { id } = useParams();

  function validEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const { checkIfUserExists, addSharedUser } = useProfileStore((state) => ({
    checkIfUserExists: state.checkIfUserExists,
    addSharedUser: state.addSharedUser,
  }));

  const handleToast = (severity: string, summary: string) => {
    toast.current.show({
      severity,
      summary,
      detail: '',
      life: 3000,
    });
    if (severity == 'error') {
      console.error(summary);
    } else {
      console.log('success');
    }
  };

  const handleNewUser = async (email: string) => {
    if (validEmail(email)) {
      if (await checkIfUserExists(email)) {
        if (email == user?.email) {
          handleToast('error', 'Cannot share with yourself');
        } else {
          await addSharedUser(email, id);
          setSharedUsers((prevState) => {
            let result = [...prevState, email];
            return result;
          });
          handleToast('success', 'User added');
        }
      } else {
        handleToast('error', 'User does not exist');
      }
    } else {
      handleToast('error', 'Invalid Email');
    }
  };

  const handleRemoveUser = (email: string) => {};

  const footer = () => {
    return (
      <div>
        <Button
          label="Stop Sharing With All"
          icon="pi pi-times"
          onClick={() => setDisplaySharingDialog(false)}
          className="p-button-sm"
          style={{ background: 'red', border: '1px solid red' }}
        />
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={() => setDisplaySharingDialog(false)}
          className="p-button-sm"
          style={{ background: '#22c55e', border: 'none' }}
        />
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Sharing Settings"
        visible={displaySharingDialog}
        style={{ width: '50vw' }}
        footer={footer}
        onHide={() => setDisplaySharingDialog(false)}>
        <p>Shared Users</p>
        <CustomChips
          id="sharedUsers"
          value={sharedUsers}
          placeholder="Enter user email"
          onRemove={(e) => {
            handleRemoveUser(e.value);
          }}
          onAdd={(e) => {
            // @ts-ignore
            handleNewUser(e.value);
          }}></CustomChips>
      </Dialog>
    </>
  );
}
