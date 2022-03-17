import React from 'react';
import { Container } from '../../styles/globalPage.styles';
import Layout from '../../layouts/Layout';

export default function Profile() {
  return <Container>Profile</Container>;
}

Profile.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
