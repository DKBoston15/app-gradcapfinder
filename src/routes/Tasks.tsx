import React, { useEffect, useState } from 'react';
import { Container } from '../styles/globalPage.styles';
import Layout from '../layouts/Layout';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Overview from './TaskRoutes/Overview';
import { useProjectStore } from '@app/stores/projectStore';
import { supabase } from '@app/supabase';
import TaskNavBar from '@app/components/Navigation/TaskNavBar/TaskNavBar';
import TasksView from './TaskRoutes/TasksView';
import TasksBottomMobileNavBar from '../components/Navigation/TasksBottomMobileNavBar/TasksBottomMobileNavBar';
import { Steps } from 'intro.js-react';
import { useGeneralStore } from '@app/stores/generalStore';

export default function Tasks() {
  const getProjects = useProjectStore((state: any) => state.getProjects);
  let [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const setSelectedProject = useProjectStore((state: any) => state.setSelectedProject);
  const location = useLocation();
  const navigate = useNavigate();
  const onboarding = useGeneralStore((state: any) => state.onboarding);
  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);

  const steps = [
    {
      element: '.taskMetrics',
      intro:
        'As you create and complete tasks, these metrics will update and give you a quick overview of what you have accomplished!',
      position: 'left',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.taskCompletion',
      intro: `As you complete tasks over time, you'll be able to see that completion here in a line graph and filter by date range.`,
      position: 'left',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.taskViews',
      intro: 'Each of these views allows you to easily see a subset of your tasks.',
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.tasksPersonal',
      intro:
        'While you create project tasks on the project page, you also have a spot to track personal tasks here!',
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
  ];

  const onExit = () => {
    setOnboarding(false);
  };

  useEffect(() => {
    const getProjectData = async () => {
      const initialProjects = await getProjects();
      const projectId = searchParams.get('projectId');
      if (projectId) {
        const project = initialProjects.filter((project: any) => project.id == projectId);
        setSelectedProject(projectId, project[0].name);

        setLoading(false);
      } else {
        setSelectedProject(initialProjects[0].id, initialProjects[0].name);
        setLoading(false);
      }
    };
    getProjectData();
    if (location.pathname === '/projects') navigate('/projects/overview');
  }, []);

  const SubPage = () => {
    if (location.pathname === '/tasks') return <Overview />;
    if (location.pathname === '/tasks/overview') return <Overview />;
    if (location.pathname === '/tasks/today') return <TasksView />;
    if (location.pathname === '/tasks/upcoming') return <TasksView />;
    if (location.pathname === '/tasks/all') return <TasksView />;
    if (location.pathname === '/tasks/completed') return <TasksView />;
    if (location.pathname === '/tasks/personal') return <TasksView />;
    return <div>No Path</div>;
  };

  return (
    <Layout>
      <Steps enabled={onboarding} steps={steps} initialStep={0} onExit={onExit} />
      <TaskNavBar />
      <TasksBottomMobileNavBar />
      {!loading && (
        <Container>
          <SubPage />
        </Container>
      )}
    </Layout>
  );
}
