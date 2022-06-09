import styled from 'styled-components';
import { TabView } from 'primereact/tabview';
import { motion } from 'framer-motion';
import { Tag } from 'primereact/tag';

export const Container = styled(motion.div)`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-top: 1.3rem;
  overflow: auto;
  background: '#e7e7e7';
  max-width: 750px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1.3rem;
  @media (max-width: 850px) {
    padding-right: 4rem;
    flex-direction: column;
    text-align: center;
  }
`;

export const CustomTabView = styled(TabView)`
  width: 100%;
  background: '#e7e7e7';
  max-width: 830px;
  height: 100%;
  padding: 0 1.3rem;
  @media (max-width: 850px) {
    padding: 0 0rem;
    font-size: 12px;
  }
`;

export const HeaderTitle = styled.div`
  font-size: 22px;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

export const CustomTag = styled(Tag)`
  margin-left: 1rem;
`