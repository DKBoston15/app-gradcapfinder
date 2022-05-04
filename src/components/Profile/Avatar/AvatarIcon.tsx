import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/index';
import { Avatar } from 'primereact/avatar';
import { useProfileStore } from '../../../stores/profileStore';
import Avvvatars from 'avvvatars-react';
import { Container, NonAbsoluteContainer } from './styles';

interface AvatarIconProps {
  setVisible?: (value: boolean) => void;
  absolute?: boolean;
}

export default function AvatarIcon({ setVisible, absolute }: AvatarIconProps) {
  const user = supabase.auth.user();
  const [email, setEmail] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const profile = useProfileStore((state: any) => state.profile);
  const getProfileImageUrl = useProfileStore((state: any) => state.getProfileImageUrl);

  useEffect(() => {
    setEmail(user?.email || '');
    const getImageUrl = async () => {
      if (user && profile.avatar_url) {
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
    <div>
      {absolute && (
        <Container onClick={() => setVisible!(true)}>
          {loading ? (
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: '2em', marginLeft: '0.5em' }}></i>
          ) : (
            <div>
              {avatarUrl ? (
                <Avatar image={avatarUrl} shape="circle" size="large" />
              ) : (
                <Avvvatars value={email} style="shape" size={44} />
              )}
            </div>
          )}
        </Container>
      )}
      {!absolute && (
        <NonAbsoluteContainer onClick={() => setVisible!(true)}>
          {loading ? (
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: '1em', marginLeft: '0.5em' }}></i>
          ) : (
            <div>
              {avatarUrl ? (
                <Avatar image={avatarUrl} shape="circle" size="xlarge" />
              ) : (
                <Avvvatars value={email} style="shape" size={44} />
              )}
            </div>
          )}
        </NonAbsoluteContainer>
      )}
    </div>
  );
}
