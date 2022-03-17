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
          <Link href="/" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Dashboard</NavLink>
          </Link>
          <Link href="/tasks" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Tasks</NavLink>
          </Link>
          <Link href="/projects" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Projects</NavLink>
          </Link>
          <Link href="/learn" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Learn</NavLink>
          </Link>
          <Link href="/chat" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Chat</NavLink>
          </Link>
          <Link href="/profile" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Profile</NavLink>
          </Link>
          <Link href="/settings" passHref>
            <NavLink onClick={() => setVisibleRight(false)}>Settings</NavLink>
          </Link>
        </NavList>
      </NavSidebar>
    </Container>
  );
}
