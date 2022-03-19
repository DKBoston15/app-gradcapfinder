import { useState } from "react";
import { Sidebar } from "primereact/sidebar";

export default function ProfileSidebar({ visible, setVisible }) {
  return (
    <Sidebar
      visible={visible}
      position="right"
      onHide={() => setVisible(false)}
    >
      Profile
    </Sidebar>
  );
}
