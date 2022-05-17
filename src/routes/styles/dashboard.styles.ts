import styled from 'styled-components';
import { Button } from 'primereact/button';

export const Container = styled.main`
  padding-left: 2rem;
  padding-top: 1.3rem;
  padding-right: 2rem;
  width: 100%;
  background: #f7f9ff;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

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
    width: 50%;
    display: flex;
    justify-content: space-between;
`

export const CustomButton = styled(Button)`
    width: 10rem;
    display: flex;
    justify-content: center;
`