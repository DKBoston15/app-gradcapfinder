import CompletedTasksFigure from '@app/components/Tasks/Overview/CompletedTasksFigure/CompletedTasksFigure';
import TasksCompletedFigure from '@app/components/Tasks/Overview/TasksCompletedFigure/TasksCompletedFigure';
import { Container, OverviewGrid } from './RouteStyles/overview.styles';
import React from 'react';

export default function Overview() {
  return (
    <Container>
      <OverviewGrid>
        <CompletedTasksFigure />
        <TasksCompletedFigure />
      </OverviewGrid>
    </Container>
  );
}
