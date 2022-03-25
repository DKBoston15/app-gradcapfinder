import styled from "styled-components";
import { TabView } from "primereact/tabview";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 55%;
  flex-direction: column;
  padding-top: 1.3rem;
  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CustomTabView = styled(TabView)`
  width: 100%;
`;

export const HeaderTitle = styled.div`
  font-size: 22px;
`;
