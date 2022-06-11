import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

export const Container = styled.div`
  background: '#fff';
  padding: 2rem;
  height: 100vh;
  border-right: 1px solid #EBF1FB;
  border-left: 1px solid #EBF1FB;
  position: fixed;
  left: 6rem;
  @media (max-width: 1470px) {
    left: 0;
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
  height: 90%;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const NavLink = styled(Link)`
  font-size: 18px;
  text-decoration: none !important;
  color: black;
  margin: 0.1rem 0;
  padding: 0.5rem 0.4rem;
  display: flex;
  align-items: center;
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
  margin-bottom: 1rem;
  padding: 0rem 0.2rem;
`;

export const LinkContainer = styled.div`
  margin: 0.5rem 0;
`

export const Icon = styled.i`
  font-size: 1.3rem;
  padding-right: 1rem;
`