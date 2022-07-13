import ProjectOverviewHeader from '@app/components/Projects/ProjectOverviewHeader/ProjectOverviewHeader';
import { Container, OverviewGrid } from './RouteStyles/overview.styles';
import ProjectInfo from '@app/components/Projects/Overview/ProjectInfo/ProjectInfo';
import ProjectTeam from '@app/components/Projects/Overview/ProjectTeam/ProjectTeam';
import React from 'react';
import { useGeneralStore } from '@app/stores/generalStore';
import { Steps } from 'intro.js-react';
import { projectOverviewOnboardingSteps } from '@app/constants/onboardingSteps';

export default function Overview() {
  const onboarding = useGeneralStore((state: any) => state.onboarding);
  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);
  const onExit = () => {
    setOnboarding(false);
  };

  return (
    <Container>
      <Steps
        enabled={onboarding}
        steps={projectOverviewOnboardingSteps}
        initialStep={0}
        onExit={onExit}
      />
      <ProjectOverviewHeader />
      <OverviewGrid>
        <ProjectInfo />
        <ProjectTeam />
      </OverviewGrid>
    </Container>
  );
}
