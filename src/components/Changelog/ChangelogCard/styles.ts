import styled from "styled-components";

export const Container = styled.div`
    padding: 1rem;
    margin-bottom: 2rem; 
    border-radius: 0.375rem; 
    border-width: 2px; 
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); 
    width: 65%;
    border: 1px solid black;
    @media (max-width: 1024px) {
        width: 100%;
      }
`

export const DateContainer = styled.span`
    margin-bottom: 1rem; 
    font-size: 1.25rem;
    line-height: 1.75rem; 
    font-weight: 700; 
`

export const SubHeader = styled.h2`
    margin-bottom: 0.5rem; 
    margin-top: 1rem;
    font-size: 1.25rem;
    line-height: 1.75rem; 
    font-weight: 700; 
`

export const ListItem = styled.li`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem; 
`