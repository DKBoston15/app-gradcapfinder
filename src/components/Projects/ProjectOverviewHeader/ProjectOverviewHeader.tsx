import SplitAddProjectButton from './SplitAddProjectButton/SplitAddProjectButton';
import { Container, Title } from './styles';
import React from 'react';

export default function ProjectOverviewHeader() {
  return (
    <Container>
      <Title>Overview</Title>
      <SplitAddProjectButton />
    </Container>
  );
}
