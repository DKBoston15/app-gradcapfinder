import React from 'react';
import { Container } from '../../styles/globalPage.styles';
import Layout from '../../layouts/Layout';

export default function Learn() {
  return <Container>Learn</Container>;
}

Learn.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
