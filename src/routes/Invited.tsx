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

export default function Invited() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleSetup = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) navigate('/dashboard');
      }
    };
    handleSetup();
  }, []);

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
      </InviteContainer>
      <ImageContainer>
        <img src="/awaiting_invite.svg" width="95%" height="70%" />
      </ImageContainer>
    </MainContainer>
  );
}
