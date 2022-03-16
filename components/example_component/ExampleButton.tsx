import React from "react";
import { Button } from "primereact/Button";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

export function ExampleButton({ label, color, onClick, textcolor }: any) {
  const themeContext = useContext(ThemeContext);
  return (
    <Wrapper textcolor={textcolor}>
      <CustomButton
        label={label}
        textcolor={textcolor}
        color={color}
        onClick={() => onClick()}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  color: ${(props) => props.textcolor};
`;

const CustomButton = styled(Button).attrs((props) => ({
  style: {
    background: props.theme.color,
    border: `${props.theme.border}`,
    color: props.textcolor,
  },
}))``;
