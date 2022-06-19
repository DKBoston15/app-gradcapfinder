import styled from 'styled-components';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

export const GridItem = styled.div`
    grid-column: 1 / 3;
    grid-row: 1 / 4;
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
    width: 100%;
    display: flex;
    height: 100%;
    padding-top: 1rem;
    justify-content: center;
`;

export const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 3rem;
    margin-bottom: 2rem;
    @media (max-width: 1470px) {
        width: 50%;
      }
`

export const Icon = styled.i`
    background: white;
    padding: 1rem;
    border-radius: 6px;
    font-size: 1.3rem;
`

export const EditIcon = styled.i`
    color: gray;
    padding-left: 1rem;
    cursor: pointer;
`

export const DateItem = styled.div`
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const CustomCalendar = styled(Calendar)`
    margin-top: 0.5rem;
`

export const GreenButton = styled(Button)`
    background-color: #2ecc71;
    height: 50px;
    white-space: nowrap;
    margin-right: 1rem;
    border: none;
    &:hover {
        transform: scale(1.05);
        background: #2ecc71 !important;
      }
`

export const BlueButton = styled(Button)`
    background-color: #2381FE;
    height: 50px;
    white-space: nowrap;
    margin-right: 1rem;
    border: none;
    &:hover {
        transform: scale(1.05);
        background: #0663DD !important;
      }
`

export const RedButton = styled(Button)`
    background-color: #e74c3c;
    height: 50px;
    white-space: nowrap;
    border: none;
    &:hover {
        transform: scale(1.05);
        background: #e74c3c !important;
    }
`

export const DescriptionContainer = styled.div`
    display: flex;
    width: 100%;
    word-break:break-all;
`

export const DescriptionButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    @media (max-width: 1470px) {
        width: 75%;
        margin-top: 2rem;
    }
`

export const DescriptionHeader = styled.h3`
    font-size: 20px;
    padding-bottom: 1rem;
`

export const CustomTextarea = styled(InputTextarea)`
    margin-bottom: 1rem;
    height: 8rem;
`

export const TextareaTitle = styled.h5`
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
`

export const IconContainer = styled.div`
    text-align: center;
    display: flex;
    align-items:center;
    justify-content:center;
`