import React from 'react';
import Link from 'next/link';
import { Container, Icon, LinkContainer, Button } from './styles';
import { supabase } from '../../supabase';
import { server } from '../../config';

export default function MainNavBar() {
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
      <Button
        onClick={async () => {
          try {
            await supabase.auth.signOut();
            await fetch(`${server}/api/auth/set`, {
              method: 'GET',
              credentials: 'same-origin',
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Logout
      </Button>
    </Container>
  );
}
