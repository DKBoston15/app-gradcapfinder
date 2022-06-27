import styled from 'styled-components';
import { TabView } from 'primereact/tabview';
import { motion } from 'framer-motion';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';

export const Container = styled(motion.div)`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-top: 1.3rem;
  overflow: auto;
  background: '#e7e7e7';
  max-width: 750px;
  @media (max-width: 1650px) {
    width: 45%;
  }
  @media (max-width: 1470px) {
    margin-left: 26rem;
  }
  @media (max-width: 1290px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const CustomBadge = styled(Badge)`
  min-width: 1.1rem;
  height: 1rem;
  line-height: 1rem;
  margin-left: 0.3rem;
`

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
  @media (max-width: 1650px) {
    width: 575px;
  }
  @media (max-width: 1470px) {
    max-width: 830px;
    width: 650px;
  }
  @media (max-width: 1415px) {
    max-width: 830px;
    width: 600px;
  }
  @media (max-width: 1350px) {
    max-width: 830px;
    width: 550px;
  }
  @media (max-width: 1290px) {
    max-width: 700px;
    width: 700px;
    padding-left: 0rem;
  }
  @media (max-width: 850px) {
    padding: 0 0rem;
    font-size: 12px;
  }
  @media (max-width: 750px) {
    width: 650px;
  }
  @media (max-width: 680px) {
    width: 550px;
  }
  @media (max-width: 580px) {
    width: 450px;
  }
  @media (max-width: 470px) {
    width: 400px;
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