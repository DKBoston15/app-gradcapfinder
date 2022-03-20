import { useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import ProfileForm from "../ProfileForm/ProfileForm";
import { useProfileStore } from "../../stores/profileStore";
import { supabase } from "../../supabase";

export default function ProfileSidebar({ visible, setVisible }) {
  const getProfile = useProfileStore((state: any) => state.getProfile);
  const user = supabase.auth.user();

  useEffect(() => {
    getProfile(user?.id);
  }, []);

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
