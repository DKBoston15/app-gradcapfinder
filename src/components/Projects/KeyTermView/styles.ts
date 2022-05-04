import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const KeyTermContainer = styled.div`
  display: grid;
  background: white;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 6px;
  margin: 1rem 0;
  padding: 1rem;
`;

export const KeyTermName = styled.li`
  padding-right: 1rem;
  margin: 0.5rem 0;
  font-size: 18px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Icon = styled.i`
  cursor: pointer;
`;

export const AutoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InputLabel = styled.h3`
  font-size: 18px;
  padding-right: 1rem;
`;

export const NameContainer = styled.div``;

export const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin-right: 2rem;
`;
