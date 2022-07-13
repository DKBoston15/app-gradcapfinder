import styled from 'styled-components';
import { Button } from 'primereact/button';

export const FileUploadIcon = styled.i`
  font-size: 24px;
  cursor: pointer;
`;

export const FileUploadIconSmall = styled(FileUploadIcon).attrs((props) => ({
  style: {
    border: props.theme.border,
    color: props.theme.drawerTextColor,
  },
}))`
  font-size: 18px;
  cursor: pointer;
  margin-left: 2rem;
  border: 2px solid black;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export const ColoredButton = styled(Button).attrs((props) => ({
  style: {
    color: props.theme.coloredButtonText,
  },
}))``;

export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
`;
