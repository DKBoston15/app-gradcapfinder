import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import ProfileForm from "../ProfileForm/ProfileForm";

export default function ProfileSidebar({ visible, setVisible }) {
  return (
    <Sidebar
      visible={visible}
      position="right"
      onHide={() => setVisible(false)}
      className="p-sidebar-md"
    >
      <ProfileForm />
    </Sidebar>
  );
}
