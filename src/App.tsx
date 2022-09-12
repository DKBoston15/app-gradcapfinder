import React, { useEffect, useState } from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import {
  MainContainer,
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

  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN') navigate('/dashboard');
  });
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'PASSWORD_RECOVERY') navigate('/password_recovery');
  });

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
    });
    const handleSetup = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        handleProfileCheck(user);
      }
    };
    handleSetup();
  }, []);

  const handleProfileCheck = async (user: any) => {
    console.log(user?.id, 'running');
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

  const Container = (props: any) => {
    Auth.useUser();
    return props.children;
  };

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <FullStory org={ORG_ID} />
      <MainContainer>
        <Title>
          <img src="/quester_logo.png" width="100%" />
        </Title>
        <Container supabaseClient={supabase}>
          <AuthContainer>
            <DetailsContainer>
              <Details>Sign in to Quester</Details>
              <DetailsSubtitle>
                Let us take the hassle out of organizing and managing your research!
              </DetailsSubtitle>
            </DetailsContainer>
            <Auth
              supabaseClient={supabase}
              providers={['google']}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#1d82fe',
                      brandAccent: '#016ef4',
                      inputText: 'white',
                    },
                  },
                },
              }}
              localization={{
                variables: {
                  sign_up: {
                    email_label: 'Email Address',
                    password_label: 'Create a Password',
                    button_label: 'Sign Up',
                    social_provider_text: 'Sign up with',
                    link_text: 'Not registered yet? Register ->',
                  },
                  sign_in: {
                    email_label: 'Email Address',
                    password_label: 'Your Password',
                    button_label: 'Sign In',
                    social_provider_text: 'Sign in with',
                    link_text: 'Already have an account? Sign in!',
                  },
                  magic_link: {
                    email_input_label: 'Email Address',
                    email_input_placeholder: 'Your email address',
                    button_label: 'Send Magic Link',
                    link_text: 'Send a magic link email',
                  },
                  forgotten_password: {
                    email_label: 'Email Address',
                    password_label: 'Your Password',
                    button_label: 'Send reset password instructions',
                    link_text: 'Forgot your password?',
                  },
                  update_password: {
                    password_label: 'New password',
                    password_input_placeholder: 'Your new password',
                    button_label: 'Update password',
                  },
                },
              }}
            />
          </AuthContainer>
        </Container>
      </MainContainer>
    </Auth.UserContextProvider>
  );
}
