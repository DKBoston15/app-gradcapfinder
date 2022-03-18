import styled from "styled-components";
import { Sidebar } from "primereact/sidebar";
import { Link } from "react-router-dom";

export const Icon = styled.i`
  font-size: 28px;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    translate3d: (0px, 0px, 0px);
  }
`;

export const Container = styled.div`
  display: none;
  position: absolute;
  right: 0px;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const NavList = styled.div.attrs((props) => ({
  style: {
    background: props.theme.color,
    color: props.theme.textColor,
  },
}))`
  display: flex;
  flex-direction: column;
`;

export const NavLink = styled(Link).attrs((props) => ({
  style: {
    color: props.theme.textColor,
  },
}))`
  font-size: 28px;
  padding: 1rem 0;
  text-decoration: none;
`;

export const NavSidebar = styled(Sidebar).attrs((props) => ({
  style: {
    background: props.theme.color,
    color: props.theme.textColor,
  },
}))`
  display: flex;
  flex-direction: column;
`;

export const Logout = styled.p.attrs((props) => ({
  style: {
    color: props.theme.textColor,
  },
}))`
  font-size: 28px;
  padding: 1rem 0;
  cursor: pointer;
  padding-top: 4rem;
  text-decoration: none;
`;
