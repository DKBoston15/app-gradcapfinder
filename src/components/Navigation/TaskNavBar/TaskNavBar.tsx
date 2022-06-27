import { Container, NavList, NavLink, SubNavHeader } from './styles';
import { Divider } from 'primereact/divider';
import React from 'react';

export default function TaskNavBar() {
  return (
    <Container>
      <SubNavHeader>Tasks</SubNavHeader>
      <NavList>
        <NavLink to="/tasks">Tasks</NavLink>
        <Divider />
        <NavLink to="/tasks/metrics">Metrics</NavLink>
      </NavList>
    </Container>
  );
}
