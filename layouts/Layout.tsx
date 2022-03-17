import React from 'react';
import MainNavBar from '../components/MainNavBar/MainNavBar';
import MobileNavBar from '../components/MobileNavBar/MobileNavBar';
import { MainContainer } from './styles';

export default function Layout({ children }: any) {
  return (
    <MainContainer>
      <MainNavBar />
      {children}
      <MobileNavBar />
    </MainContainer>
  );
}
