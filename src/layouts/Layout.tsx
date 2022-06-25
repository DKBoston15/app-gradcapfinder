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
import useTaskStore from '@app/stores/tasksv2Store';
import { useProjectStore } from '@app/stores/projectStore';
import { useLiteratureStore } from '@app/stores/literatureStore';
import { usePeopleStore } from '@app/stores/peopleStore';
import { useJournalStore } from '@app/stores/journalStore';
import { useKeyTermStore } from '@app/stores/keytermStore';
import { useResearchParadigmsStore } from '@app/stores/researchParadigmsStore';
import { useResearchQuestionsStore } from '@app/stores/researchQuestionsStore';

export default function Layout({ children }: any) {
  const theme = useThemeStore((state: any) => state.theme);
  const visible = useGeneralStore((state: any) => state.visible);
  const setVisible = useGeneralStore((state: any) => state.setVisible);
  const getTodos = useTaskStore((state: any) => state.getTodos);
  const getProjects = useProjectStore((state: any) => state.getProjects);
  const getLiterature = useLiteratureStore((state: any) => state.getLiterature);
  const getPeople = usePeopleStore((state: any) => state.getPeople);
  const getJournals = useJournalStore((state: any) => state.getJournals);
  const getKeyTerms = useKeyTermStore((state: any) => state.getKeyTerms);
  const getResearchQuestions = useResearchQuestionsStore(
    (state: any) => state.getResearchQuestions,
  );
  const getResearchParadigms = useResearchParadigmsStore(
    (state: any) => state.getResearchParadigms,
  );
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

  useEffect(() => {
    getTodos();
    getProjects();
    getLiterature();
    getPeople();
    getJournals();
    getKeyTerms();
    getResearchParadigms();
    getResearchQuestions();
  }, []);

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
