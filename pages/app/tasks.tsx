import React from 'react';
import { Container } from '../../styles/globalPage.styles';
import Layout from '../../layouts/Layout';

export default function Tasks() {
  return <Container>Tasks</Container>;
}

Tasks.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
