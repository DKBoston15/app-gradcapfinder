import {
  MainContainer,
  ImageContainer,
  InviteContainer,
  Title,
  Details,
  DetailsContainer,
  DetailsSubtitle,
} from '../styles/invited.styles';
import React, { useEffect } from 'react';
import { supabase } from '@app/supabase';
import { useNavigate } from 'react-router-dom';
import { useGeneralStore } from '@app/stores/generalStore';

export default function Invited() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleSetup = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data } = await supabase.from('profiles').select(`*`).eq('id', user?.id).single();
        if (data) {
          if (data.invited) {
            navigate('/dashboard');
          }
        }
      }
    };
    handleSetup();
  }, []);

  const { handleNavChange } = useGeneralStore((state) => ({
    handleNavChange: state.handleNavChange,
  }));

  const signOut = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('quester_login');
    handleNavChange('/');
  };

  return (
    <MainContainer>
      <InviteContainer>
        <Title>Quester</Title>
        <DetailsContainer>
          <Details>Thank you for confirming your account!</Details>
          <DetailsSubtitle>
            Quester is in a closed beta right now! If you've been asked to create an account, we've
            been notified and will get you into Quester as soon as possible! <br />
            <br /> If you just found us, we have you on the list and will reach out to you as soon
            as we are ready for you!
          </DetailsSubtitle>
        </DetailsContainer>
        <div onClick={() => signOut()} className="sidebar-link" style={{ cursor: 'pointer' }}>
          <img src="/logout.png" />
          <div className="hidden-sidebar">Logout</div>
        </div>
      </InviteContainer>
      <ImageContainer>
        <img src="/awaiting_invite.svg" width="95%" height="70%" />
      </ImageContainer>
    </MainContainer>
  );
}
