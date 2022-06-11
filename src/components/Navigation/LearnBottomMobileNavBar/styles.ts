import styled from "styled-components";
import { TabMenu } from 'primereact/tabmenu';
import { Sidebar } from 'primereact/sidebar';

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 50;
    width: 100%;
    display: none;
    @media (max-width: 1470px) {
        display: block
      }
`

export const CustomTabMenu = styled(TabMenu)`
& .p-tabmenu-nav {
    background: var(--color-bg);
    border: 0;
    justify-content: center;
  };

  & .p-menuitem-link {
    background: var(--color-bg) !important;
    color: white !important;
    padding: 1.25rem 0.75rem !important;
  };
`

export const CustomSidebar = styled(Sidebar)`

`