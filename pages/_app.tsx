import "../styles/globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "@fontsource/poppins"; // Defaults to weight 400.
import type { AppProps } from "next/app";
import useCurrentTheme from "../hooks/useCurrentTheme";
import ThemeSelector from "../components/ThemeSelector";
import { ThemeProvider } from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedTheme, setSelectedTheme] = useCurrentTheme();
  return (
    <ThemeProvider theme={selectedTheme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
