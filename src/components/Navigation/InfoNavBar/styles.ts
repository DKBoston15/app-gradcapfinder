import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const Container = styled.div.attrs((props) => ({
  style: {
    // background: props.theme.color,
    background: '#ecf0f1',
    // color: props.theme.textColor,
  },
}))`
  padding-top: 2rem;
  padding-left: 1rem;
  height: 100vh;
  min-width: 15rem;
`;

export const CustomButton = styled(Button)`
  height: 2.7rem;
  margin-left: 0.4rem;
`;

export const CustomSearch = styled(InputText)`
  max-width: 10rem;
  width: 10rem;
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
  &:hover {
    transform: scale(1.05);
    background: white;
    border-radius: 6px;
  }
`;

export const Title = styled.h3`
  font-size: 22px;
  color: black;
  margin-bottom: 2rem;
`;

export const ButtonContainer = styled.div``;
