import CompletedTasksFigure from '@app/components/Tasks/Overview/CompletedTasksFigure/CompletedTasksFigure';
import TasksCompletedFigure from '@app/components/Tasks/Overview/TasksCompletedFigure/TasksCompletedFigure';
import { Container, OverviewGrid } from './RouteStyles/overview.styles';
import React from 'react';
import Layout from '@app/layouts/Layout';
import TaskNavBar from '@app/components/Navigation/TaskNavBar/TaskNavBar';
import TasksBottomMobileNavBar from '@app/components/Navigation/TasksBottomMobileNavBar/TasksBottomMobileNavBar';

export default function Metrics() {
  return (
    <Layout>
      <TaskNavBar />
      <TasksBottomMobileNavBar />
      <Container>
        <OverviewGrid>
          <CompletedTasksFigure />
          <TasksCompletedFigure />
        </OverviewGrid>
      </Container>
    </Layout>
  );
}
