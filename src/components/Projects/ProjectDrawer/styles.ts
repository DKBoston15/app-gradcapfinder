import styled from 'styled-components';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

export const Header = styled.h3`
  font-size: 18px;
  padding-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 1rem;
  justify-content: center;
  gap: 0.5rem;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 3rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`;

export const Icon = styled.i`
  background: white;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.3rem;
`;

export const EditIcon = styled.i`
  color: gray;
  padding-left: 1rem;
  cursor: pointer;
`;

export const DateItem = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 10rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const CustomCalendar = styled(Calendar)`
  margin-top: 0.5rem;
`;

export const GreenButton = styled(Button)`
  background-color: #2ecc71;
  width: 14rem;
  display: flex;
  justify-content: center;
  height: 50px;
  white-space: nowrap;
  border: none;
  &:hover {
    transform: scale(1.05);
    background: #2ecc71 !important;
  }
`;

export const BlueButton = styled(Button)`
  background-color: #2381fe;
  width: 14rem;
  display: flex;
  justify-content: center;
  height: 50px;
  white-space: nowrap;
  border: none;
  &:hover {
    transform: scale(1.05);
    background: #0663dd !important;
  }
`;

export const RedButton = styled(Button)`
  background-color: #e74c3c;
  height: 50px;
  width: 14rem;
  display: flex;
  justify-content: center;
  white-space: nowrap;
  border: none;
  &:hover {
    transform: scale(1.05);
    background: #e74c3c !important;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  width: 100%;
  word-break: break-all;
`;

export const DescriptionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const DescriptionHeader = styled.h3`
  font-size: 20px;
  padding-bottom: 1rem;
`;

export const CustomTextarea = styled(InputTextarea)`
  margin-bottom: 1rem;
  height: 8rem;
  width: 80%;
`;

export const TextareaTitle = styled.h5`
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
`;

export const IconContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -1.5rem;
`;

export const ProjectName = styled.h2`
  font-size: 18px;
  font-weight: bold;
  padding-top: 1rem;
  display: flex;
  align-items: center;
`;
