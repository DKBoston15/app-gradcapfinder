import styled from "styled-components";

export const TOCContainer = styled.div`
    font-size: 14px;
    @media (max-width: 850px) {
       display: none;
      }
`

export const TOCHeader = styled.div`
    padding-bottom: 1rem;
`

export const TOCSectionHeader = styled.div`
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    color: gray;
    cursor: pointer;
    &:hover {
        color: black;
    }
`

export const TOCSectionItem = styled.div`
    padding: 0.5rem;
    color: gray;
    cursor: pointer;
    &:hover {
        color: black;
    }
`