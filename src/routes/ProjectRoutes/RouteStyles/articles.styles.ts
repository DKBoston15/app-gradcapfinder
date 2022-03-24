import styled from "styled-components";
import { InputText } from "primereact/inputtext";

export const Container = styled.div.attrs((props) => ({
  style: {
    // background: props.theme.color,
    background: "white",
    // color: props.theme.textColor,
  },
}))`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
`;
