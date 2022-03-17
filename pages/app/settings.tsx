import React from 'react';
import { Container } from '../../styles/globalPage.styles';
import ThemeSelector from '../../components/ThemeSelector/ThemeSelector';
import Layout from '../../layouts/Layout';

export default function Settings() {
  return (
    <Container>
      Settings
      <ThemeSelector />
    </Container>
  );
}

Settings.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
