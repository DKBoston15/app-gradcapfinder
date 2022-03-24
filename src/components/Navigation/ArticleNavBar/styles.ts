import styled from "styled-components";
import { InputText } from "primereact/inputtext";

export const Container = styled.div.attrs((props) => ({
  style: {
    // background: props.theme.color,
    background: "#ecf0f1",
    // color: props.theme.textColor,
  },
}))`
  padding-top: 2rem;
  padding-left: 1rem;
  height: 100vh;
  width: 15rem;
`;

export const CustomSearch = styled(InputText)`
  width: 100%;
  max-width: 12rem;
  width: 12rem;
`;

export const CustomSearchContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  max-width: 12rem;
  width: 12rem;
`;

export const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ArticleItem = styled.li`
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
