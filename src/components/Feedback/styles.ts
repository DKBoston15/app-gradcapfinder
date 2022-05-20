import styled from "styled-components";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export const FeedbackContainer = styled.div`
    z-index: 75;
    position: fixed;
    bottom: 80px;
    @media (max-width: 1350px) {
        bottom: 100px;
      }
    right: -35px;
    transform: rotate(-90deg);
    background: #2381fe;
    border-radius: 6px;
    color: white;
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.05) rotate(-90deg);
      }
`

export const FeedbackPopup = styled.div`
z-index: 75;
position: fixed;
bottom: 50px;
right: 35px;
background: #2381fe;
border-radius: 6px;
color: white;
padding: 0.5rem;
height: 25rem;
width: 20rem;
background: white;
border: 2px solid #2381fe;
color: black;
display: flex;
flex-direction: column;
`

export const CustomButton = styled(Button)`
      margin: 0.5rem 0;
      display: flex;
      justify-content: center;
`

export const CustomTextarea = styled(InputTextarea)`
margin: 0.5rem 0;
`

export const IntroText = styled.div`
    font-size: 24px;
    padding: 1rem 0;
`

export const DescriptionText = styled.div`
    font-size: 16px;
    padding: 0.3rem 0;
`

export const IconContainer = styled.div`
      display: flex;
      justify-content: space-between;
`