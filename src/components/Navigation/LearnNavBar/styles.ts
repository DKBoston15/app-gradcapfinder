import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div.attrs((props) => ({
  style: {
    // background: props.theme.color,
    background: '#fff',
    // color: props.theme.textColor,
  },
}))`
  padding: 2rem;
  height: 100vh;
  border-left: 1px solid #EBF1FB;
  border-right: 1px solid #EBF1FB;
  position: fixed;
  left: 6rem;
  display: block;
  @media (max-width: 1470px) {
    left: 0;
    display: none;
  }
`;

export const NavList = styled.div.attrs((props) => ({
  style: {
    // background: props.theme.color,
    // color: props.theme.textColor,
  },
}))`
  display: flex;
  height: 90%;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const NavLink = styled(Link).attrs((props) => ({
  style: {
    // color: props.theme.textColor,
  },
}))`
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

export const OverviewNavLink = styled(Link).attrs((props) => ({
  style: {
    // color: props.theme.textColor,
  },
}))`
  text-decoration: none !important;
  color: black;
  padding: 0.5rem 0rem;
  &:hover {
    transform: scale(1.05);
    background: white;
    border-radius: 6px;
  }
`;

export const SubNavHeader = styled.h3.attrs((props) => ({
  style: {
    // color: props.theme.textColor,
  },
}))`
  font-size: 22px;
  color: black;
  margin-bottom: 2rem;
`;

export const SectionHeader = styled.h3`
  font-size: 20px;
  margin: 0.5rem 0;
  padding: 0rem 0.2rem;
`;

export const DisabledNavLink = styled(Link).attrs((props) => ({
  style: {
    // color: props.theme.textColor,
  },
}))`
  font-size: 16px;
  text-decoration: none !important;
  color: lightgray;
  margin: 0.1rem 0;
  padding: 0.5rem 0.4rem;
  pointer-events: none;
  &:hover {
    transform: scale(1.05);
    background: white;
    border-radius: 6px;
  }
`;