import styled from 'styled-components';

export const Container = styled.main`
  position: fixed;
  right: 10px;
  top: 10px;
  cursor: pointer;
  z-index: 75;
  @media (max-width: 1000px) {
    display: flex;
    right: 60px;
    top: 10px;
  }
`;

export const NonAbsoluteContainer = styled.main`
  cursor: pointer;
`;
