import React, { useEffect } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useGeneralStore } from '@app/stores/generalStore';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function NavChangePrompt() {
  const navigate = useNavigate();
  const { setDisplayNavChangePrompt, setNavChangePath, displayNavChangePrompt, navChangePath } =
    useGeneralStore((state) => ({
      setDisplayNavChangePrompt: state.setDisplayNavChangePrompt,
      setNavChangePath: state.setNavChangePath,
      displayNavChangePrompt: state.displayNavChangePrompt,
      navChangePath: state.navChangePath,
    }));

  useEffect(() => {
    if (displayNavChangePrompt === true || displayNavChangePrompt === 'true') {
      confirm2();
    }
  }, [displayNavChangePrompt, navChangePath]);

  const leave = () => {
    navigate(navChangePath);
    setDisplayNavChangePrompt(false);
    setNavChangePath('');
    sessionStorage.setItem('noteContentPending', false);
  };

  const stay = () => {
    setDisplayNavChangePrompt(false);
    setNavChangePath('');
  };

  const confirm2 = () => {
    confirmDialog({
      className: 'navChangePrompt',
      message:
        'You have unsaved notes, are you sure you want to leave this page losing those notes?',
      header: 'Unsaved Notes',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: leave,
      reject: stay,
    });
  };

  return <ConfirmDialog />;
}
