import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Card = styled.div`
    background: white;
    padding: 1rem;
    margin: 0.5rem 0;
`

export const Name = styled.div`
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Role = styled.div`
    padding-top: 0.5rem;
`;

export const Email = styled.div`
    display: flex;
    padding-top: 1rem;
`;

export const IconContainer = styled.div`
    display: flex;
    padding-left: 1rem;
`

export const Icon = styled.i`
    padding: 0 0.2rem;
    cursor: pointer;
    text-decoration: none;
    color: black;
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
