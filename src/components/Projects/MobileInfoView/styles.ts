import styled from "styled-components";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

export const FeedbackContainer = styled.div`
    z-index: 75;
    position: fixed;
    top: 150px;
    right: -20px;
    transform: rotate(-90deg);
    background: #2381fe;
    border-radius: 6px;
    color: white;
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.05) rotate(-90deg);
      }
      @media (min-width: 1000px) {
        display: none;
      }
`

export const CustomSidebar = styled(Sidebar)`

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

export const Container = styled.div.attrs(() => ({
    style: {
      // background: props.theme.color,
      background: '#fff',
      // color: props.theme.textColor,
    },
  }))`
    padding-top: 2rem;
    padding-left: 1rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
    height: 100%;
    width: 20rem;
    border-left: 1px solid #EBF1FB;
    border-right: 1px solid #EBF1FB;
    overflow: auto;
  `;
  
  export const CustomInput = styled.span`
    margin: 1.5rem 0;
  `;
  
  export const ReferenceTitle = styled.div`
    margin-bottom: 1rem;
    font-size: 18px;
  `;
  
  export const DOICheckbox = styled.div`
    margin-top: 1rem;
    padding-bottom: 2rem;
  `;
  
  export const PageContainer = styled.div`
    display: flex;
  `;
  
  export const ReferenceDateInfo = styled.div`
    display: flex;
  `;
  
  export const ReferenceInput = styled.span`
    margin: 0.75rem 0;
  `;
  
  export const ReferenceContainer = styled.div`
    line-height: 25px;
    background: #dfe6e9;
    padding: 0.5rem;
    border-radius: 6px;
  `;
  
  export const Header = styled.div`
    margin-bottom: 2rem;
    padding-left: 0.2rem;
    font-size: 18px;
  `;
  