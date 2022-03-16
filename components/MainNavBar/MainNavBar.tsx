import React from "react";
import Link from "next/link";
import styled from "styled-components";

export function MainNavBar() {
  return (
    <Container>
      <Link href="/dashboard">
        <Icon className="pi pi-th-large"></Icon>
      </Link>
      <Link href="/tasks">
        <Icon className="pi pi-check-square"></Icon>
      </Link>
      <Link href="/projects">
        <Icon className="pi pi-folder-open"></Icon>
      </Link>
      <Link href="/learn">
        <Icon className="pi pi-book"></Icon>
      </Link>
      <Link href="/chat">
        <Icon className="pi pi-comments"></Icon>
      </Link>
      <Link href="/profile">
        <Icon className="pi pi-user"></Icon>
      </Link>
      <Link href="/settings">
        <Icon className="pi pi-cog"></Icon>
      </Link>
    </Container>
  );
}

const Icon = styled.i`
  font-size: 28px;
  padding: 2rem 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    translate3d: (0px, 0px, 0px);
  }
`;

const Container = styled.div.attrs((props) => ({
  style: {
    background: props.theme.color,
  },
}))`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;
