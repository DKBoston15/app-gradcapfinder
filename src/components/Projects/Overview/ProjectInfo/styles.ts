import styled from 'styled-components';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

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
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 1rem;
`;

export const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    margin-right: 3rem;
    @media (max-width: 1470px) {
        width: 100%;
      }
`

export const Icon = styled.i`
    background: white;
    padding: 1rem;
    border-radius: 6px;
    margin-right: 1rem;
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
    @media (max-width: 1470px) {
        flex-direction: column;
      }
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
    margin-top: 1rem;
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
        width: 100%;
        margin-top: 2rem;
    }
`

export const DescriptionHeader = styled.h3`
    font-size: 20px;
    padding-bottom: 1rem;
`

export const CustomTextarea = styled(InputTextarea)`
    margin-bottom: 1rem;
`

export const TextareaTitle = styled.h5`
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
`

export const IconContainer = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
`