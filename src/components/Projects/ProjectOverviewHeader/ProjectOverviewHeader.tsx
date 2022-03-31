import SplitAddProjectButton from './SplitAddProjectButton/SplitAddProjectButton';
import { Container } from './styles';

export default function ProjectOverviewHeader() {
  return (
    <Container>
      <div>Overview</div>
      <SplitAddProjectButton />
    </Container>
  );
}
