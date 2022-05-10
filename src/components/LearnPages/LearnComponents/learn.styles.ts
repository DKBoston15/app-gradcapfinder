import styled from "styled-components";
import { Divider } from 'primereact/divider';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 5rem;
`

export const Page = styled.div`
    padding-right: 5rem;
`

export const Header = styled.h1`
    font-size: 32px;
`

export const SubHeader = styled.h2`
    font-size: 24px;
    padding: 1rem 0;
`

export const ItemHeader = styled.h3`
    font-size: 20px;
    padding-top: 1rem;
    padding-bottom: 1rem;
`

export const Paragraph = styled.p`
    font-size: 16px;
    color: #3c4257;
    line-height: 26px;
    padding-bottom: 1rem;
`

export const CustomDivider = styled(Divider)`
    border: 1px solid lightgray !important;
`

export const NestedSection = styled.div`
    padding-left: 2rem;
`