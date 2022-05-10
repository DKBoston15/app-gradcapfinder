import styled from 'styled-components';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

export const GridItem = styled.div`
    grid-column: 1 / 3;
    grid-row: 1;
    background: #fff;
    border: 1px solid #EBF1FB;
    border-bottom: 4px solid #EBF1FB;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.h3`
    font-size: 18px;
    padding-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    height: 4rem;
    padding-right: 2rem;
    padding-top: 1rem;
`;

export const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    justify-content: start;
`

export const Icon = styled.i`
    background: white;
    padding: 1rem;
    border-radius: 6px;
    margin-right: 1rem;
    font-size: 1.3rem;
`

export const DateItem = styled.div`
    padding: 1rem 0;
    display: flex;
    align-items: start;
    flex-direction: column;
`

export const Container = styled.div`
    display: flex;
`

export const CustomCalendar = styled(Calendar)`
margin-top: 0.5rem;
`

export const GreenButton = styled(Button)`
    background-color: #2ecc71;
    border: none;
    &:hover {
        transform: scale(1.05);
        background: #2ecc71 !important;
      }
`

export const RedButton = styled(Button)`
background-color: #e74c3c;
border: none;
&:hover {
    transform: scale(1.05);
    background: #e74c3c !important;
  }
`