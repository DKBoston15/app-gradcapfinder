import React, { useEffect, useState } from 'react';
import { Container } from '../styles/globalPage.styles';
import Layout from '../layouts/Layout';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Metrics from './TaskRoutes/Metrics';
import { useProjectStore } from '@app/stores/projectStore';
import TaskNavBar from '@app/components/Navigation/TaskNavBar/TaskNavBar';
import TasksBottomMobileNavBar from '../components/Navigation/TasksBottomMobileNavBar/TasksBottomMobileNavBar';
import { Steps } from 'intro.js-react';
import { useGeneralStore } from '@app/stores/generalStore';
import TasksV3 from './TasksV3/TasksV3';

const steps = [
  {
    element: '.onboardingAddNewTask',
    intro: 'Click here to add a new task',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.onboardingSearch',
    intro: `You can search/filter down your result here`,
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.onboardingExportButtons',
    intro: 'You can export your tasks in a variety of ways here',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.nothing',
    intro:
      'In the table itself you can resize columns, drag and drop rows, edit, sort, filter, complete or delete a task, and expand each row downwards to add notes',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
];

export default function Tasks() {
  const getProjects = useProjectStore((state: any) => state.getProjects);
  let [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const setSelectedProject = useProjectStore((state: any) => state.setSelectedProject);
  const location = useLocation();
  const navigate = useNavigate();
  const onboarding = useGeneralStore((state: any) => state.onboarding);
  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);

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
      } else if (initialProjects.length > 0) {
        setSelectedProject(initialProjects[0].id, initialProjects[0].name);
        setLoading(false);
      }
    };
    getProjectData();
    if (location.pathname === '/projects') navigate('/projects/overview');
  }, []);

  const SubPage = () => {
    if (location.pathname === '/tasks') return <TasksV3 />;
    if (location.pathname === '/tasks/metrics') return <Metrics />;
    if (location.pathname === '/tasks/tasks') return <TasksV3 />;
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
