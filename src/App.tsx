import React, { useEffect } from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
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
import FullStory from 'react-fullstory';
import { useNavigate } from 'react-router-dom';

const ORG_ID = '13J61T';

export default function App(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSetup = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        const user = await supabase.auth.getUser();
        handleProfileCheck(user.data.user);
      }
    };
    handleSetup();
  }, []);

  const handleProfileCheck = async (user: any) => {
    if (user?.id) {
      const { data } = await supabase.from('profiles').select(`*`).eq('id', user?.id).single();
      if (data) {
        if (!data.invited) {
          navigate('/invited');
        } else {
          let loginValue = sessionStorage.getItem('quester_login');
          if (loginValue !== 'true') {
            sessionStorage.setItem('quester_login', 'true');
            navigate('/dashboard');
          }
          if (location.pathname === '/') {
            navigate('/dashboard');
          }
        }
      }
    }
  };

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async (event, _session) => {
  //     if (event === 'SIGNED_IN') {
  //       handleProfileCheck();
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     handleProfileCheck();
  //   }
  // }, [user]);

  const Container = (props: any) => {
    Auth.useUser();
    return props.children;
  };

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <FullStory org={ORG_ID} />
      <MainContainer>
        <Container supabaseClient={supabase}>
          <AuthContainer>
            <Title>Quester</Title>
            <DetailsContainer>
              <Details>Log in</Details>
              <DetailsSubtitle>Welcome back! Please enter your details!</DetailsSubtitle>
            </DetailsContainer>
            <Auth
              supabaseClient={supabase}
              providers={['google']}
              appearance={{ theme: ThemeSupa }}
            />
          </AuthContainer>
        </Container>
        <ImageContainer>
          <img src="/LoginBanner.jpg" width="100%" height="100%" style={{ objectFit: 'cover' }} />
        </ImageContainer>
      </MainContainer>
    </Auth.UserContextProvider>
  );
}
