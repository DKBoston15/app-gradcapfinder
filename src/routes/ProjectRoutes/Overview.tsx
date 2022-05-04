import ProjectOverviewHeader from '@app/components/Projects/ProjectOverviewHeader/ProjectOverviewHeader';
import { Container, OverviewGrid } from './RouteStyles/overview.styles';
import ProjectInfo from '@app/components/Projects/Overview/ProjectInfo/ProjectInfo';
import UpcomingTasks from '@app/components/Projects/Overview/UpcomingTasks/UpcomingTasks';
import ProjectTeam from '@app/components/Projects/Overview/ProjectTeam/ProjectTeam';

export default function Overview() {
  return (
    <Container>
      <ProjectOverviewHeader />
      <OverviewGrid>
        <ProjectInfo />
        <UpcomingTasks />
        <ProjectTeam />
      </OverviewGrid>
    </Container>
  );
}
