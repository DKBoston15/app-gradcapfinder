import {
  Container,
  NavList,
  NavLink,
  SubNavHeader,
  SectionHeader,
  OverviewNavLink,
  Icon,
} from './styles';
import { Divider } from 'primereact/divider';
import React from 'react';

export default function TaskNavBar() {
  return (
    <Container>
      <SubNavHeader>Tasks</SubNavHeader>
      <NavList>
        <NavLink to="/tasks/overview">Overview</NavLink>
        <Divider />
        <SectionHeader>Task Views</SectionHeader>
        <NavLink to="/tasks/today">
          <Icon className="pi pi-inbox" style={{ color: '#5297FF' }} />
          Today's
        </NavLink>

        <NavLink to="/tasks/upcoming">
          <Icon className="pi pi-calendar-plus" style={{ color: '#24B84C' }} />
          Upcoming
        </NavLink>
        <Divider />
        <NavLink to="/tasks/all">
          <Icon className="pi pi-folder-open" style={{ color: '#A971FF' }} />
          All Current
        </NavLink>

        <NavLink to="/tasks/completed">
          <Icon className="pi pi-check-circle" style={{ color: '#24B84C' }} />
          Completed
        </NavLink>

        <Divider />
        <NavLink to="/tasks/personal">
          <Icon className="pi pi-user" style={{ color: '#1ABC9C' }} />
          Personal
        </NavLink>
      </NavList>
    </Container>
  );
}
