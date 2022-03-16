import React from "react";
import { Button } from "primereact/Button";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

export function ExampleButton({ label, color, onClick, textColor }: any) {
  const themeContext = useContext(ThemeContext);

  console.log("Current theme: ", themeContext);
  return (
    <Wrapper textColor={textColor}>
      <CustomButton
        label={label}
        textColor={textColor}
        color={color}
        onClick={() => onClick()}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  color: ${(props) => props.textColor};
`;

const CustomButton = styled(Button).attrs((props) => ({
  style: {
    background: props.theme.color,
    border: `${props.theme.border}`,
    color: props.textColor,
  },
}))``;
