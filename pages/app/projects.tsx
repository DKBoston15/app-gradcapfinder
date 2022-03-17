import React from 'react';
import { Container } from '../../styles/globalPage.styles';
import Layout from '../../layouts/Layout';

export default function Projects() {
  return <Container>Projects</Container>;
}

Projects.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
