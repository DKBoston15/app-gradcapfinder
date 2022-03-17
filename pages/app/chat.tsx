import React from 'react';
import { Container } from '../../styles/globalPage.styles';
import Layout from '../../layouts/Layout';

export default function Chat() {
  return <Container>Chat</Container>;
}

Chat.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
