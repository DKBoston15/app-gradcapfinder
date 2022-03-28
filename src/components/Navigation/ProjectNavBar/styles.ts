import styled from "styled-components";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

export const Container = styled.div.attrs((props) => ({
  style: {
    // background: props.theme.color,
    background: "#dfe6e9",
    // color: props.theme.textColor,
  },
}))`
  padding: 2rem;
  height: 100vh;
`;

export const CustomDropdown = styled(Dropdown)`
  width: 100%;
  margin-bottom: 2rem;
  max-width: 12rem;
  width: 12rem;
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
  font-size: 18px;
  font-weight: bold;
  margin: 0.5rem 0;
  padding: 0rem 0.2rem;
`;
