import styled from 'styled-components';
import { Calendar } from 'primereact/calendar';
import { SelectButton } from 'primereact/selectbutton';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 810px;
`;

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

export const CustomSelect = styled(SelectButton)`
  white-space: nowrap;
`;

export const CustomCalendar = styled(Calendar)`
  margin-right: 1rem;
`;

export const SelectCalenderContainer = styled.div`
  display: flex;
  align-items: center;
`;
