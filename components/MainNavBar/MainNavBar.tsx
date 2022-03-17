import React from 'react';
import Link from 'next/link';
import { Container, Icon } from './styles';

export default function MainNavBar() {
  return (
    <Container>
      <Link href="/">
        <Icon className="pi pi-th-large" />
      </Link>
      <Link href="/tasks">
        <Icon className="pi pi-check-square" />
      </Link>
      <Link href="/projects">
        <Icon className="pi pi-folder-open" />
      </Link>
      <Link href="/learn">
        <Icon className="pi pi-book" />
      </Link>
      <Link href="/chat">
        <Icon className="pi pi-comments" />
      </Link>
      <Link href="/profile">
        <Icon className="pi pi-user" />
      </Link>
      <Link href="/settings">
        <Icon className="pi pi-cog" />
      </Link>
    </Container>
  );
}
