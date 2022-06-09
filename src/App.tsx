import React, { useEffect } from 'react';
import { Auth } from '@supabase/ui';
import {
  MainContainer,
  ImageContainer,
  AuthContainer,
  Title,
  Details,
  DetailsContainer,
  DetailsSubtitle,
} from './styles/index.styles';
import { supabase } from './supabase/index';
import { useNavigate } from 'react-router-dom';

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const user = supabase.auth.user();

  const handleProfileCheck = async () => {
    const { data, error, status } = await supabase
      .from('profiles')
      .select(`*`)
      .eq('id', user?.id)
      .single();

    if (!data.invited) {
      navigate('/invited');
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        handleProfileCheck();
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      handleProfileCheck();
    }
  }, [user]);

  const Container = (props: any) => {
    const { user } = Auth.useUser();
    return props.children;
  };

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <MainContainer>
        <Container supabaseClient={supabase}>
          <AuthContainer>
            <Title>Quester</Title>
            <DetailsContainer>
              <Details>Log in</Details>
              <DetailsSubtitle>Welcome back! Please enter your details!</DetailsSubtitle>
            </DetailsContainer>
            <Auth supabaseClient={supabase} providers={['google']} />
          </AuthContainer>
        </Container>
        <ImageContainer>
          <img src="/LoginBanner.jpg" width="100%" height="100%" style={{ objectFit: 'cover' }} />
        </ImageContainer>
      </MainContainer>
    </Auth.UserContextProvider>
  );
}
