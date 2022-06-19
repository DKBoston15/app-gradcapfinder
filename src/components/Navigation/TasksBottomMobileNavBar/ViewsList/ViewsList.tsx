import React from 'react';
import { Container, NavList, NavLink, SectionHeader } from './styles';
import { Divider } from 'primereact/divider';

export default function ViewsList({ setVisibleBottom }: any) {
  const closeDropdown = async () => {
    setVisibleBottom(false);
  };

  return (
    <Container>
      <NavList>
        <SectionHeader>Task Views</SectionHeader>
        <NavLink onClick={() => closeDropdown()} to={`/tasks/tasks`}>
          Tasks
        </NavLink>
        {/* <NavLink onClick={() => closeDropdown()} to={`/tasks/upcoming`}>
          Upcoming
        </NavLink>
        <Divider />
        <NavLink onClick={() => closeDropdown()} to={`/tasks/all`}>
          All Current
        </NavLink>
        <NavLink onClick={() => closeDropdown()} to={`/tasks/completed`}>
          Completed
        </NavLink> */}
      </NavList>
    </Container>
  );
}
