import SplitAddProjectButton from './SplitAddProjectButton/SplitAddProjectButton';
import { Container, Title } from './styles';

export default function ProjectOverviewHeader() {
  return (
    <Container>
      <Title>Overview</Title>
      <SplitAddProjectButton />
    </Container>
  );
}
