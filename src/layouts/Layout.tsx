import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import MainNavBar from '../components/Navigation/MainNavBar/MainNavBar';
import MobileNavBar from '../components/Navigation/MobileNavBar/MobileNavBar';
import { MainContainer } from './styles';
import { useThemeStore } from '../stores/theme';
import AvatarIcon from '../components/Profile/Avatar/AvatarIcon';
import ProfileSidebar from '../components/Profile/ProfileSidebar/ProfileSidebar';
import MobileProfileSidebar from '../components/Profile/MobileProfileSidebar/MobileProfileSidebar';

export default function Layout({ children }: any) {
  const theme = useThemeStore((state: any) => state.theme);
  const [visible, setVisible] = useState(false);
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

        <AvatarIcon setVisible={setVisible} absolute={true} />
        <MainNavBar />
        {children}
        <MobileNavBar />
      </MainContainer>
    </ThemeProvider>
  );
}
