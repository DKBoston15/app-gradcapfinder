import ProjectOverviewHeader from '@app/components/Projects/ProjectOverviewHeader/ProjectOverviewHeader';
import { Container, OverviewGrid } from './RouteStyles/overview.styles';
import ProjectInfo from '@app/components/Projects/Overview/ProjectInfo/ProjectInfo';
import ProjectTeam from '@app/components/Projects/Overview/ProjectTeam/ProjectTeam';
import React, { useEffect } from 'react';
import { useGeneralStore } from '@app/stores/generalStore';
import { Steps } from 'intro.js-react';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import Layout from '@app/layouts/Layout';
import NavigationLayout from '@app/layouts/NavigationLayout';

const steps = [
  {
    element: '.newProjectButton',
    intro: 'You can create new projects, and rename projects here.',
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.projectDropdown',
    intro: 'Once you have multiple projects, you can switch between them here.',
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.projectSelector',
    intro:
      'These are all the project sections you have access to! Each one has been designed to assist in you in managing these parts of your projects.',
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.projectInfo',
    intro:
      'You can store your general project info here, as well as complete or archive a project.',
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.projectTeam',
    intro: `Any project people that have a project role will show up here.`,
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.upcomingTasks',
    intro: 'Any project tasks with an upcoming due date will appear here.',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
];

export default function Overview() {
  const onboarding = useGeneralStore((state: any) => state.onboarding);
  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);

  const onExit = () => {
    setOnboarding(false);
  };

  return (
    <Container>
      <Steps enabled={onboarding} steps={steps} initialStep={0} onExit={onExit} />
      <ProjectOverviewHeader />
      <OverviewGrid>
        <ProjectInfo />
        <ProjectTeam />
      </OverviewGrid>
    </Container>
  );
}
