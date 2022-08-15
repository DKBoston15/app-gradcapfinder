import React, { useState, useEffect } from 'react';
import './navigationlayout.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGeneralStore } from '@app/stores/generalStore';
import { supabase } from '@app/supabase';
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
import { useSamplesStore } from '@app/stores/samplesStore';
import { useTablesStore } from '@app/stores/tablesStore';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { useProfileStore } from '@app/stores/profileStore';
import useTaskStore from '@app/stores/tasksv2Store';
import AvatarIcon from '@app/components/Profile/Avatar/AvatarIcon';
import { useKBar, useRegisterActions } from 'kbar';
import Feedback from '@app/components/Feedback/Feedback';

import {
  PageTitle,
  SearchBar,
  Profile,
  RightSide,
  CustomInputText,
  NotificationBell,
  LeftSide,
  IconContainer,
  IconItem,
} from './styles';
import ProfileSidebar from '@app/components/Profile/ProfileSidebar/ProfileSidebar';
import MobileProfileSidebar from '@app/components/Profile/MobileProfileSidebar/MobileProfileSidebar';
import Notifications from '@app/components/Notifications/Notifications/Notifications';
import NavChangePrompt from '@app/components/NavChangePrompt/NavChangePrompt';
import { useResourceStore } from '@app/stores/resourceStore';
import useChecklistStore from '@app/stores/checklistStore';

export default function NavigationLayout({ children, title, table, newActions }: any) {
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
  const getSamples = useSamplesStore((state: any) => state.getSamples);
  const getTables = useTablesStore((state: any) => state.getTables);
  const getEntries = useEntryFeedStore((state: any) => state.getEntries);
  const getProfile = useProfileStore((state: any) => state.getProfile);
  const getResources = useResourceStore((state: any) => state.getResources);
  const getChecklists = useChecklistStore((state: any) => state.getChecklists);

  const getResearchQuestions = useResearchQuestionsStore(
    (state: any) => state.getResearchQuestions,
  );
  const getResearchParadigms = useResearchParadigmsStore(
    (state: any) => state.getResearchParadigms,
  );

  const getAll = useGeneralStore((state: any) => state.getAll);

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
    getSamples();
    getTables();
    getEntries();
    getResources();
    getChecklists();
  }, []);

  useEffect(() => {
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
    getSamples();
    getTables();
    getEntries();
    getResources();
    getChecklists();
  }, [getAll]);

  const { navVisible, setNavVisible, visible, setVisible, handleNavChange } = useGeneralStore(
    (state) => ({
      navVisible: state.navVisible,
      setNavVisible: state.setNavVisible,
      visible: state.visible,
      setVisible: state.setVisible,
      handleNavChange: state.handleNavChange,
    }),
  );

  useRegisterActions([...newActions]);

  const signOut = async () => {
    await supabase.auth.signOut();
    handleNavChange('/');
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { query } = useKBar();

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
    <div id="body">
      <NavChangePrompt />
      <Feedback />
      {windowDimension.winWidth > 1000 ? (
        <ProfileSidebar visible={visible} setVisible={setVisible} />
      ) : (
        <MobileProfileSidebar visible={visible} setVisible={setVisible} />
      )}
      <header className="header">
        <LeftSide>
          <IconContainer>
            <IconItem
              className="pi pi-bars"
              style={{ fontSize: '1.3rem', marginLeft: '1rem' }}
              onClick={() => setNavVisible(!navVisible)}
            />
          </IconContainer>
          <PageTitle>{title}</PageTitle>
        </LeftSide>
        <RightSide>
          <SearchBar onClick={() => query.toggle()}>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <CustomInputText disabled placeholder="Search" id="disabledSearchInput" />
            </span>
          </SearchBar>
          {/* <QuickAddTask>
            <i
              className="pi pi-plus"
              style={{ fontSize: '0.8em', color: 'white', fontWeight: 'bold' }}
            />
          </QuickAddTask> */}
          <NotificationBell>
            <Notifications />
          </NotificationBell>
          <Profile>
            <AvatarIcon size="small" />
          </Profile>
        </RightSide>
      </header>
      <div className="container">
        <aside className={`sidebar ${navVisible ? 'open' : 'closed'}`} data-sidebar>
          <div className="top-sidebar">
            <a href="/" className="channel-logo">
              <img src="/nav_logo.png" alt="Channel Logo" />
            </a>
            <div className="hidden-sidebar channel-name">Quester</div>
          </div>
          <div className="middle-sidebar">
            <ul className="sidebar-list">
              <li
                className={`sidebar-list-item ${
                  location.pathname.includes('dashboard') ? 'active' : ''
                }`}>
                <div onClick={() => handleNavChange('/dashboard')} className="sidebar-link">
                  <i className="pi pi-th-large" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Dashboard</div>
                </div>
              </li>
              <li
                className={`sidebar-list-item ${
                  location.pathname.includes('metrics') ? 'active' : ''
                }`}>
                <div onClick={() => handleNavChange('/tasks/metrics')} className="sidebar-link">
                  <i className="pi pi-chart-line" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Metrics</div>
                </div>
              </li>
              {/* <li
                className={`sidebar-list-item ${
                  location.pathname.includes('projects') ? 'active' : ''
                }`}>
                <div onClick={() => handleNavChange('/projects')} className="sidebar-link">
                  <i className="pi pi-folder-open" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Projects</div>
                </div>
              </li> */}
              <hr style={{ width: '100%' }} />
              <li
                className={`sidebar-list-item ${
                  location.pathname == '/research' ||
                  location.pathname.includes('/research/articles') ||
                  location.pathname.includes('/research/research_paradigms') ||
                  location.pathname.includes('/research/research_questions') ||
                  location.pathname.includes('/research/analytic_designs')
                    ? 'active'
                    : ''
                }`}>
                <div onClick={() => handleNavChange('/research')} className="sidebar-link">
                  <i className="pi pi-compass" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Research</div>
                </div>
              </li>
              <li
                className={`sidebar-list-item ${
                  location.pathname == '/analysis' ||
                  location.pathname.includes('/analysis/sample') ||
                  location.pathname.includes('/analysis/analysis_techniques')
                    ? 'active'
                    : ''
                }`}>
                <div onClick={() => handleNavChange('/analysis')} className="sidebar-link">
                  <i className="pi pi-chart-bar" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Analysis</div>
                </div>
              </li>
              <li
                className={`sidebar-list-item ${
                  location.pathname == '/professionalism' ||
                  location.pathname.includes('/professionalism/tables') ||
                  location.pathname.includes('/professionalism/labs') ||
                  location.pathname.includes('/professionalism/models') ||
                  location.pathname.includes('/professionalism/figures')
                    ? 'active'
                    : ''
                }`}>
                <div onClick={() => handleNavChange('/professionalism')} className="sidebar-link">
                  <i className="pi pi-users" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Professionalism</div>
                </div>
              </li>
              <li
                className={`sidebar-list-item ${
                  location.pathname == '/writing' ||
                  location.pathname.includes('/writing/people') ||
                  location.pathname.includes('/writing/key_terms') ||
                  location.pathname.includes('/writing/journals')
                    ? 'active'
                    : ''
                }`}>
                <div onClick={() => handleNavChange('/writing')} className="sidebar-link">
                  <i className="pi pi-pencil" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Writing</div>
                </div>
              </li>
              <hr style={{ width: '100%' }} />
              <li className={`sidebar-list-item ${location.pathname == '/tasks' ? 'active' : ''}`}>
                <div onClick={() => handleNavChange('/tasks')} className="sidebar-link">
                  <i className="pi pi-check-square" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Tasks</div>
                </div>
              </li>
              <li
                className={`sidebar-list-item ${
                  location.pathname.includes('checklists') ? 'active' : ''
                }`}>
                <div onClick={() => handleNavChange('/checklists')} className="sidebar-link">
                  <i className="pi pi-chart-line" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Checklists</div>
                </div>
              </li>
              {/* <li
                className={`sidebar-list-item ${
                  location.pathname.includes('checklists') ? 'active' : ''
                }`}>
                <div onClick={() => navigate('/checklists')} className="sidebar-link">
                  <i className="pi pi-list" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Checklists</div>
                </div>
              </li> */}
              <hr style={{ width: '100%' }} />
              <li
                className={`sidebar-list-item ${
                  location.pathname.includes('knowledge_base') ? 'active' : ''
                }`}>
                <div onClick={() => handleNavChange('/knowledge_base')} className="sidebar-link">
                  <i className="pi pi-book" style={{ fontSize: '1.3rem' }} />
                  <div className="hidden-sidebar">Knowledge Base</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="bottom-sidebar">
            <ul className="sidebar-list">
              {/* <li
                className={`sidebar-list-item ${
                  location.pathname.includes('settings') ? 'active' : ''
                }`}>
                <div onClick={() => navigate('/settings')} className="sidebar-link">
                  <svg
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    className="sidebar-icon">
                    <g>
                      <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path>
                    </g>
                  </svg>
                  <div className="hidden-sidebar">Settings</div>
                </div>
              </li> */}
              <li className="sidebar-list-item">
                <div onClick={() => signOut()} className="sidebar-link">
                  <img src="/logout.png" />
                  <div className="hidden-sidebar">Logout</div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
        <main className={`content ${table ? 'table' : ''}`}>{children}</main>
      </div>
    </div>
  );
}
