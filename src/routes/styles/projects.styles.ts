import styled from 'styled-components';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

export const Container = styled.div`
background: #f7f9ff;
`

export const CustomDataTable = styled(DataTable)`

`

export const SpinnerContainer = styled.div`
    width: 100%;
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
`
export const NotFoundContainer = styled.div`
    width: 100%;
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-left: 10rem;
`

export const IntroContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    width: 50rem;
    background: #fff;
    border: 1px solid #EBF1FB;
    border-bottom: 4px solid #EBF1FB;
    border-radius: 6px;
    padding: 2rem;
    @media (max-width: 768px) {
        width: 95%;
      }
`

export const Title = styled.h3`
    font-size: 36px;
`

export const Paragraph = styled.p`
    font-size: 18px;
    text-align: center;
    padding: 2rem 0;
`

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const CustomButton = styled(Button)`
    width: 10rem;
    display: flex;
    justify-content: center;
`