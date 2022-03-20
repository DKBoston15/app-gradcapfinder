import { useState, useEffect } from "react";
import { supabase } from "../../supabase/index";
import { Avatar } from "primereact/avatar";
import { useProfileStore } from "../../stores/profileStore";
import Avvvatars from "avvvatars-react";
import { Container } from "./styles";

export default function AvatarIcon({ setVisible }) {
  const user = supabase.auth.user();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const profile = useProfileStore((state: any) => state.profile);
  const getProfileImageUrl = useProfileStore(
    (state: any) => state.getProfileImageUrl
  );

  useEffect(() => {
    const getImageUrl = async () => {
      if (user && profile) {
        const url = await getProfileImageUrl(profile.avatar_url);
        if (url) {
          setAvatarUrl(url);
        }
        setLoading(false);
      }
    };
    getImageUrl();
  }, [profile]);

  return (
    <Container onClick={() => setVisible(true)}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          {avatarUrl ? (
            <Avatar image={avatarUrl} shape="circle" size="large" />
          ) : (
            <Avvvatars value={user?.email} style="shape" size={44} />
          )}
        </div>
      )}
    </Container>
  );
}
