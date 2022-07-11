import { Container } from './styles/settings.styles';
import ThemeSelector from '../components/ThemeSelector/ThemeSelector';
import React from 'react';

export default function Settings() {
  return (
    <Container>
      Settings
      <ThemeSelector />
    </Container>
  );
}
