import React from 'react';
import { ThemeProvider } from 'styled-components';
import MainNavBar from '../components/MainNavBar/MainNavBar';
import MobileNavBar from '../components/MobileNavBar/MobileNavBar';
import { MainContainer } from './styles';
import { useThemeStore } from '../stores/theme';

export default function Layout({ children }: any) {
  const theme = useThemeStore((state: any) => state.theme);
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <MainNavBar />
        {children}
        <MobileNavBar />
      </MainContainer>
    </ThemeProvider>
  );
}
