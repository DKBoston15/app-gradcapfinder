import styled from 'styled-components';
import { TabView } from 'primereact/tabview';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-top: 1.3rem;
  overflow: auto;
  background: '#e7e7e7';
  max-width: 830px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1.3rem;
`;

export const CustomTabView = styled(TabView)`
  width: 100%;
  background: '#e7e7e7';
  max-width: 830px;
  height: 100%;
  padding: 0 1.3rem;
`;

export const HeaderTitle = styled.div`
  font-size: 22px;
`;
