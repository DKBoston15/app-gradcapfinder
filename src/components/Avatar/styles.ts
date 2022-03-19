import styled from "styled-components";

export const Container = styled.main`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: none;
  }
`;
