import React from 'react';
import Link from 'next/link';
import { Container, Icon, LinkContainer, Button } from './styles';
import { supabase } from '../../supabase';

export default function MainNavBar() {
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <Container>
      <LinkContainer>
        <Link href="/app/dashboard">
          <Icon className="pi pi-th-large" />
        </Link>
        <Link href="/app/tasks">
          <Icon className="pi pi-check-square" />
        </Link>
        <Link href="/app/projects">
          <Icon className="pi pi-folder-open" />
        </Link>
        <Link href="/app/learn">
          <Icon className="pi pi-book" />
        </Link>
        <Link href="/app/chat">
          <Icon className="pi pi-comments" />
        </Link>
        <Link href="/app/profile">
          <Icon className="pi pi-user" />
        </Link>
        <Link href="/app/settings">
          <Icon className="pi pi-cog" />
        </Link>
      </LinkContainer>
      <Button onClick={() => logout()}>Logout</Button>
    </Container>
  );
}
