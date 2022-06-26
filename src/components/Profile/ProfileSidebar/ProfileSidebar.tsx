import React from 'react';
import ProfileForm from '../ProfileForm/ProfileForm';
import { Sidebar } from 'primereact/sidebar';
interface ProfileSidebarProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function ProfileSidebar({ visible, setVisible }: ProfileSidebarProps) {
  return (
    <Sidebar
      visible={visible}
      position="right"
      onHide={() => setVisible(false)}
      className="p-sidebar-md">
      <ProfileForm />
    </Sidebar>
  );
}
