import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/index';
import { Avatar } from 'primereact/avatar';
import { useProfileStore } from '../../../stores/profileStore';
import Avvvatars from 'avvvatars-react';
import { Container, NonAbsoluteContainer } from './styles';
import { useGeneralStore } from '@app/stores/generalStore';

interface AvatarIconProps {
  absolute?: boolean;
  size: string;
}

export default function AvatarIcon({ absolute, size }: AvatarIconProps) {
  const user = supabase.auth.user();
  const [email, setEmail] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const setVisible = useGeneralStore((state: any) => state.setVisible);

  const { profile, getProfileImageUrl } = useProfileStore((state) => ({
    profile: state.profile,
    getProfileImageUrl: state.getProfileImageUrl,
  }));

  useEffect(() => {
    setEmail(user?.email || '');
    const getImageUrl = async () => {
      if (user && profile.avatar_url) {
        const url = await getProfileImageUrl(profile.avatar_url);
        if (url) {
          setAvatarUrl(url);
        }
      }
      setLoading(false);
    };
    getImageUrl();
  }, [profile]);

  const avatarSize = size ? size : 'xlarge';

  return (
    <div>
      {absolute && (
        <Container onClick={() => setVisible!(true)} className="avatarIcon">
          {loading ? (
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: '2em', marginLeft: '0.5em' }}></i>
          ) : (
            <div>
              {avatarUrl ? (
                <>
                  <Avatar image={avatarUrl} shape="circle" size="large" />
                </>
              ) : (
                <Avvvatars value={email} style="shape" size={60} />
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
                <Avatar image={avatarUrl} shape="circle" size={avatarSize} />
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
