/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import '@fontsource/poppins'; // Defaults to weight 400.
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const getLayout = Component.getLayout || ((page: any) => page);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
