import React, { useState, useEffect } from 'react';
import {
  Container,
  ContentContainer,
  Icon,
  Button,
  OnboardingContainer,
  SidebarContainer,
  SidebarMain,
  MainContainer,
} from './navigationLayout.styles';
import './navigationlayout.css';
import { KBarProvider } from 'kbar';
import { useNavigate } from 'react-router-dom';
import KBar from './KBar/KBar';
import SidebarMainNavigation from './SidebarMainNavigation/SidebarMainNavigation';
import { Tooltip } from 'primereact/tooltip';
import { useGeneralStore } from '@app/stores/generalStore';
import { supabase } from '@app/supabase';
import NavigationHeader from './NavigationHeader/NavigationHeader';
import { useProjectStore } from '@app/stores/projectStore';
import { useLiteratureStore } from '@app/stores/literatureStore';
import { usePeopleStore } from '@app/stores/peopleStore';
import { useJournalStore } from '@app/stores/journalStore';
import { useKeyTermStore } from '@app/stores/keytermStore';
import { useResearchParadigmsStore } from '@app/stores/researchParadigmsStore';
import { useResearchQuestionsStore } from '@app/stores/researchQuestionsStore';
import { useAnalysisTechniquesStore } from '@app/stores/analysisTechniquesStore';
import { useAnalyticDesignsStore } from '@app/stores/analyticDesignsStore';
import { useFigureStore } from '@app/stores/figureStore';
import { useGrantStore } from '@app/stores/grantStore';
import { useLabsStore } from '@app/stores/labsStore';
import { useModelsStore } from '@app/stores/modelsStore';
import { useSamplingStore } from '@app/stores/samplingStore';
import { useTablesStore } from '@app/stores/tablesStore';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { useProfileStore } from '@app/stores/profileStore';
import useTaskStore from '@app/stores/tasksv2Store';

export default function NavigationLayout({ children, title, items, subTitle }: any) {
  const getTodos = useTaskStore((state: any) => state.getTodos);
  const getProjects = useProjectStore((state: any) => state.getProjects);
  const getLiterature = useLiteratureStore((state: any) => state.getLiterature);
  const getPeople = usePeopleStore((state: any) => state.getPeople);
  const getJournals = useJournalStore((state: any) => state.getJournals);
  const getKeyTerms = useKeyTermStore((state: any) => state.getKeyTerms);

  const getAnalysisTechniques = useAnalysisTechniquesStore(
    (state: any) => state.getAnalysisTechniques,
  );
  const getAnalyticDesigns = useAnalyticDesignsStore((state: any) => state.getAnalyticDesigns);
  const getFigures = useFigureStore((state: any) => state.getFigures);
  const getGrants = useGrantStore((state: any) => state.getGrants);
  const getLabs = useLabsStore((state: any) => state.getLabs);
  const getModels = useModelsStore((state: any) => state.getModels);
  const getSamplings = useSamplingStore((state: any) => state.getSamplings);
  const getTables = useTablesStore((state: any) => state.getTables);
  const getEntries = useEntryFeedStore((state: any) => state.getEntries);
  const getProfile = useProfileStore((state: any) => state.getProfile);

  const getResearchQuestions = useResearchQuestionsStore(
    (state: any) => state.getResearchQuestions,
  );
  const getResearchParadigms = useResearchParadigmsStore(
    (state: any) => state.getResearchParadigms,
  );

  useEffect(() => {
    getProfile();
    getTodos();
    getProjects();
    getLiterature();
    getPeople();
    getJournals();
    getKeyTerms();
    getResearchParadigms();
    getResearchQuestions();
    getAnalysisTechniques();
    getAnalyticDesigns();
    getFigures();
    getGrants();
    getLabs();
    getModels();
    getSamplings();
    getTables();
    getEntries();
  }, []);

  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);
  const navVisible = useGeneralStore((state: any) => state.navVisible);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const actions = [
    {
      id: 'tasks',
      name: 'Tasks',
      shortcut: ['t'],
      keywords: 'task tasks',
      section: 'Navigation',
      perform: () => navigate('/tasks'),
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['p'],
      keywords: 'project projects',
      section: 'Navigation',
      perform: () => navigate('/projects'),
    },
    {
      id: 'learn',
      name: 'Learn',
      shortcut: ['l'],
      keywords: 'learn learning education knowledge details',
      section: 'Navigation',
      perform: () => navigate('/learn/overview'),
    },
  ];

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navigate = useNavigate();

  return (
    <KBarProvider
      options={{
        enableHistory: true,
      }}
      actions={actions}>
      <KBar />
      <Container>
        <SidebarMain navVisible={navVisible}>
          <SidebarContainer>
            <SidebarMainNavigation />
            <div>
              {showOnboarding && (
                <OnboardingContainer onClick={() => setOnboarding(true)}>
                  <Tooltip
                    target=".onboardingIcon"
                    content={`Start Tutorial`}
                    position="right"
                    style={{ fontSize: '18px' }}
                  />
                  <Icon className="pi pi-info-circle onboardingIcon" />
                </OnboardingContainer>
              )}
              <Button
                onClick={async () => {
                  sessionStorage.setItem('quester_login', 'false');
                  signOut();
                }}>
                Logout
              </Button>
            </div>
          </SidebarContainer>
        </SidebarMain>
        <MainContainer>
          <NavigationHeader title={title} items={items} subTitle={subTitle} />
          <ContentContainer>{children}</ContentContainer>
        </MainContainer>
      </Container>
    </KBarProvider>
  );
}
