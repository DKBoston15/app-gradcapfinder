import React, { useState } from 'react';
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
  const [view, setView] = useState('sign_in');

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event);
    const checkData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase.from('profiles').select(`*`).eq('id', user?.id).single();
      if (data) {
        if (!data.invited) {
          navigate('/invited');
        }
      }
      if (event == 'SIGNED_IN') {
        let loginValue = sessionStorage.getItem('quester_login');
        let boolOutput = loginValue === 'true';
        if (!boolOutput) {
          sessionStorage.setItem('quester_login', 'true');
          navigate('/dashboard');
        } else if (window.location.href === 'https://localhost:3000/') {
          navigate('/dashboard');
        }
      }
    };

    if (window.location.href.includes('type=recovery')) {
      console.log('yup');
    } else {
      console.log('no');
      checkData();
    }
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'PASSWORD_RECOVERY') setView('update_password');
  });

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
              redirectTo={
                import.meta.env.VITE_SUPABASE_URL === 'https://xqwimzallgvmodsrcntr.supabase.co'
                  ? 'https://localhost:3000/reset-password'
                  : 'https://www.app.quester.tech/reset-password'
              }
              view={view}
              magicLink={true}
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
