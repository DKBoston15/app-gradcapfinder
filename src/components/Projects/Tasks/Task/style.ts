import styled from 'styled-components';
import { Calendar } from 'primereact/calendar';
import { SelectButton } from 'primereact/selectbutton';
import { Link } from 'react-router-dom';

export const TaskContainer = styled.div`
  padding: 1rem;
  border: 1px solid white;
  margin: 1rem 0;
  border-radius: 6px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 810px;
  overflow-wrap: break-word;
  border: 1px solid #EBF1FB;
  border-bottom: 4px solid #EBF1FB;
`;

export const CustomToolbar = styled.div`
  display: flex !important;
  justify-content: space-between;
  align-items: center;
`;

export const CustomCalendar = styled(Calendar)`
  margin-right: 1rem;
`;

export const CustomSelect = styled(SelectButton)`
  white-space: nowrap;
`;

export const SelectCalenderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.i.attrs((props) => ({
  style: {},
}))`
  margin: 0 0.3rem;
  font-size: 12px;
  cursor: pointer;
  padding: 0.4rem 0;
`;

export const DateText = styled.div`
  padding: 0.2rem 1rem;
  border-radius: 6px;
  color: gray;
  border: 1px solid gray;
  margin-right: 1rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1rem;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
`;

export const EditContainer = styled.div`
  display: flex;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin-right: 2rem;
`;