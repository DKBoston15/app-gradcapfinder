import styled from "styled-components"
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';

export const CustomEditor = styled(Editor)`
  & .p-editor-toolbar {
    display: none;
  };
  & .p-editor-content {
    border: none !important;
    font-size: 14px;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CustomButton = styled(Button)`
    height: 1.25em;
    width: 3rem;
    display: flex;
    justify-content: center;
    font-size: 14px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1rem;
`;


export const CustomToolbar = styled.div`
  display: flex !important;
  justify-content: space-between;
  align-items: center;
`;

export const ReadonlyContainer = styled.div`
  display: flex;
  justify-content: space-between;
`