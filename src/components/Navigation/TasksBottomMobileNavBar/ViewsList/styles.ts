import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
`;

export const NavList = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 2rem;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 20px;
  text-decoration: none;
  padding: 1rem 0.4rem;
`;

  export const SectionHeader = styled.h3`
    font-size: 28px;
    margin: 0.5rem 0;
  `;