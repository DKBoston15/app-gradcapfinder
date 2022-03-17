/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import '@fontsource/poppins'; // Defaults to weight 400.
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { useThemeStore } from '../stores/theme';
import Layout from '../layouts/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useThemeStore((state: any) => state.theme);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
