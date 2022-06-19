import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

export const Container = styled.div`
  background: '#fff';
  padding: 2rem;
  height: 100vh;
  border-left: 1px solid #EBF1FB;
  border-right: 1px solid #EBF1FB;
  position: fixed;
  left: 6rem;
  overflow: auto;
  @media (max-width: 1470px) {
    left: 0;
  }
  @media (max-width: 1290px) {
    display: none;
  }
`;


export const CustomDropdown = styled(Dropdown)`
  width: 100%;
  margin-bottom: 2rem;
  max-width: 12rem;
  width: 12rem;
`;

export const NavList = styled.div`
  display: flex;
  height: 85%;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const NavLink = styled(Link)`
  font-size: 16px;
  text-decoration: none !important;
  color: black;
  margin: 0.1rem 0;
  padding: 0.5rem 0.4rem;
  &:hover {
    transform: scale(1.05);
    background: white;
    border-radius: 6px;
  }
`;

export const OverviewNavLink = styled(Link)`
  text-decoration: none !important;
  color: black;
  padding: 0.5rem 0rem;
  &:hover {
    transform: scale(1.05);
    background: white;
    border-radius: 6px;
  }
`;

export const SubNavHeader = styled.h3`
  font-size: 22px;
  color: black;
  margin-bottom: 2rem;
`;

export const SectionHeader = styled.h3`
  font-size: 20px;
  margin: 0.5rem 0;
  padding: 0rem 0.2rem;
`;