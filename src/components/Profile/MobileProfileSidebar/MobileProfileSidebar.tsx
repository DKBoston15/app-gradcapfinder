import React from 'react';
import ProfileForm from '../ProfileForm/ProfileForm';
import { Sidebar } from 'primereact/sidebar';

interface MobileProfileSidebarProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function MobileProfileSidebar({ visible, setVisible }: MobileProfileSidebarProps) {
  return (
    <Sidebar visible={visible} fullScreen onHide={() => setVisible(false)} className="p-sidebar-md">
      <ProfileForm />
    </Sidebar>
  );
}
