import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';

export const Container = styled.div.attrs((props) => ({
  style: {
    // background: props.theme.color,
    background: '#fff',
    // color: props.theme.textColor,
  },
}))`
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 2rem;
  height: 100vh;
  width: 15rem;
  border-left: 1px solid #EBF1FB;
  border-right: 1px solid #EBF1FB;
  position: fixed;
  overflow-x: auto;
  overflow-wrap: break-word;
  left: 22rem;
  @media (max-width: 768px) {
    left: 16rem;
  }
  @media (max-width: 1470px) {
    display: none;
  }
`;

export const CustomButton = styled(Button)`
  height: 2.7rem;
  margin-left: 0.4rem;
`;

export const CustomSearch = styled(InputText)`
  max-width: 12rem;
  width: 12rem;
`;

export const CustomSearchContainer = styled.div``;

export const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export const Item = styled.li`
  font-size: 16px;
  margin: 0.5rem 0;
  padding: 0.5rem 0.4rem;
  width: 90%;
  cursor: pointer;
  white-space: pre-wrap;
  &:hover {
    transform: scale(1.05);
    background: white;
    border-radius: 6px;
  }
`;

export const Title = styled.h3`
  font-size: 18px;
  color: black;
  margin-bottom: 2rem;
`;

export const ButtonContainer = styled.div``;

export const CustomSelect = styled(SelectButton)`
  white-space: nowrap;
`;

export const SelectContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`