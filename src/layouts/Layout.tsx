import { useState } from "react";
import { ThemeProvider } from "styled-components";
import MainNavBar from "../components/MainNavBar/MainNavBar";
import MobileNavBar from "../components/MobileNavBar/MobileNavBar";
import { MainContainer } from "./styles";
import { useThemeStore } from "../stores/theme";
import AvatarIcon from "../components/Avatar/Avatar";
import ProfileSidebar from "../components/ProfileSidebar/ProfileSidebar";

export default function Layout({ children }: any) {
  const theme = useThemeStore((state: any) => state.theme);
  const [visible, setVisible] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <ProfileSidebar visible={visible} setVisible={setVisible} />
        <AvatarIcon setVisible={setVisible} />
        <MainNavBar />
        {children}
        <MobileNavBar />
      </MainContainer>
    </ThemeProvider>
  );
}
