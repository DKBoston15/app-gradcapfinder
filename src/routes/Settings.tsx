import { Container } from './styles/settings.styles';
import ThemeSelector from '../components/ThemeSelector/ThemeSelector';
import Layout from '../layouts/Layout';
import React from 'react';

export default function Settings() {
  return (
    <Layout>
      <Container>
        Settings
        <ThemeSelector />
      </Container>
    </Layout>
  );
}
