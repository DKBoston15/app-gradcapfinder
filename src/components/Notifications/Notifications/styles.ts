import styled from 'styled-components'

export const Container = styled.main`
  position: fixed;
  right: 100px;
  top: 30px;
  cursor: pointer;
  z-index: 75;
  @media (max-width: 1470px) {
    display: none;
    right: 60px;
    top: 10px;
  }
`;

export const IconContainer = styled.div`

`