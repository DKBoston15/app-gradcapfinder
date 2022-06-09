import { OverlayPanel } from 'primereact/overlaypanel';
import styled from "styled-components";

export const Container = styled.div`
`

export const Title = styled.h3`
    font-size: 1.2rem;
    padding-left: 1.25rem;
    padding-top: 1rem;
`

export const Menu = styled.div`
    background: #F5F5F5;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    padding-left: 1.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`

export const MenuItem = styled.div`

`

export const NotificationContainer = styled.div`

`

export const Panel = styled(OverlayPanel)`
    & .p-overlaypanel-content {
        padding: 0;
    }
`
export const Footer = styled.div`

`