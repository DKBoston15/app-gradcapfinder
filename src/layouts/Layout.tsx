import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import MainNavBar from '../components/Navigation/MainNavBar/MainNavBar';
import MobileNavBar from '../components/Navigation/MobileNavBar/MobileNavBar';
import { MainContainer } from './styles';
import { useThemeStore } from '../stores/theme';
import ProfileSidebar from '../components/Profile/ProfileSidebar/ProfileSidebar';
import MobileProfileSidebar from '../components/Profile/MobileProfileSidebar/MobileProfileSidebar';
import Feedback from '@app/components/Feedback/Feedback';
import Notifications from '@app/components/Notifications/Notifications/Notifications';
import { useGeneralStore } from '@app/stores/generalStore';

export default function Layout({ children }: any) {
  const theme = useThemeStore((state: any) => state.theme);
  const visible = useGeneralStore((state: any) => state.visible);
  const setVisible = useGeneralStore((state: any) => state.setVisible);
  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimension]);

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        {windowDimension.winWidth > 1000 ? (
          <ProfileSidebar visible={visible} setVisible={setVisible} />
        ) : (
          <MobileProfileSidebar visible={visible} setVisible={setVisible} />
        )}
        <Feedback />
        <Notifications />
        <MainNavBar />
        {children}
        <MobileNavBar />
      </MainContainer>
    </ThemeProvider>
  );
}
