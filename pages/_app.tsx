/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import '@fontsource/poppins'; // Defaults to weight 400.
import type { AppProps } from 'next/app';
import { supabase } from '../supabase';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthSession(event, session);
        if (event === 'SIGNED_IN') {
          const signedInUser = supabase.auth.user();
          const userId = signedInUser?.id;
          supabase
            .from('profiles')
            .upsert({ id: userId })
            // @ts-ignore
            .then((_data, error) => {
              if (!error) {
                router.push('/');
              }
            });
        }
        if (event === 'SIGNED_OUT') {
          router.push('/sign-in');
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [router]);

  // @ts-ignore
  const getLayout = Component.getLayout || ((page: any) => page);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
