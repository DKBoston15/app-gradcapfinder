import { useEffect } from "react";
import ProfileForm from "../ProfileForm/ProfileForm";
import { useProfileStore } from "../../../stores/profileStore";
import { supabase } from "../../../supabase";
import { Container } from "./styles";

interface ProfileSidebarProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function ProfileSidebar({
  visible,
  setVisible,
}: ProfileSidebarProps) {
  const getProfile = useProfileStore((state: any) => state.getProfile);
  const user = supabase.auth.user();

  useEffect(() => {
    getProfile(user?.id);
    const realtimeProfileUpdates = supabase
      .from("profiles")
      .on("*", (payload) => {
        const user = supabase.auth.user();
        getProfile(user?.id);
      })
      .subscribe();
  }, []);

  return (
    <Container
      visible={visible}
      position="right"
      onHide={() => setVisible(false)}
      className="p-sidebar-md"
    >
      <ProfileForm />
    </Container>
  );
}
