import React, { useState } from 'react';
import Link from 'next/link';
import { Container, Icon, NavList, NavLink, NavSidebar } from './styles';

export default function MainNavBar() {
  const [visibleRight, setVisibleRight] = useState(false);
  return (
    <Container>
      <Icon
        className="pi pi-align-justify"
        onClick={() => setVisibleRight(true)}
      />
      <NavSidebar
        position="right"
        visible={visibleRight}
        onHide={() => setVisibleRight(false)}
      >
        <NavList>
          <Link href="app/dashboard" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Dashboard</NavLink>
          </Link>
          <Link href="app/tasks" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Tasks</NavLink>
          </Link>
          <Link href="app/projects" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Projects</NavLink>
          </Link>
          <Link href="app/learn" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Learn</NavLink>
          </Link>
          <Link href="app/chat" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Chat</NavLink>
          </Link>
          <Link href="app/profile" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Profile</NavLink>
          </Link>
          <Link href="app/settings" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Settings</NavLink>
          </Link>
        </NavList>
      </NavSidebar>
    </Container>
  );
}
