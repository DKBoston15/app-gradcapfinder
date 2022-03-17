import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { User } from '@supabase/gotrue-js';
import { server } from '../config';
import { useRouter } from 'next/router';
import { Auth } from '@supabase/ui';
import {
  MainContainer,
  ImageContainer,
  AuthContainer,
  Title,
  Details,
  DetailsContainer,
  DetailsSubtitle,
} from '../styles/index.styles';

const Login: NextPage = () => {
  const [user, setUser] = useState<User | undefined>(
    supabase.auth.user() || undefined
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      let newUser = supabase.auth.user();
      if (newUser) {
        await fetch(`${server}/api/auth/set`, {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        });
      }
      setUser(supabase.auth.user() || undefined);
    });
  });

  useEffect(() => {
    if (user && router.pathname === '/') {
      console.log(user);
      router.push('/app/dashboard');
    }
  }, [user]);

  const Container = (props: any) => {
    const { user } = Auth.useUser();
    return props.children;
  };

  return (
    <>
      {loading && <h1>Loading, please wait...</h1>}
      {!user && !loading && (
        <Auth.UserContextProvider supabaseClient={supabase}>
          <MainContainer>
            <Container supabaseClient={supabase}>
              <AuthContainer>
                <Title>Quester</Title>
                <DetailsContainer>
                  <Details>Log in</Details>
                  <DetailsSubtitle>
                    Welcome back! Please enter your details!
                  </DetailsSubtitle>
                </DetailsContainer>
                <Auth supabaseClient={supabase} providers={['google']} />
              </AuthContainer>
            </Container>
            <ImageContainer>
              <img src="/login_graphic.svg" width="100%" height="70%" />
            </ImageContainer>
          </MainContainer>
        </Auth.UserContextProvider>
      )}
    </>
  );
};

export default Login;
