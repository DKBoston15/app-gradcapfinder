import styled from "styled-components";
import { Badge } from 'primereact/badge';

export const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background: #F5F5F5;
    }
`

export const ImageContainer = styled.div`
    width: 80px;
    height: 80px;
`

export const TextContainer = styled.div`

`

export const Title = styled.div`
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
    color: black;
`

export const Date = styled.div`
    color: gray;
`

export const CustomBadge = styled(Badge)`
    margin-left: 2rem;
`