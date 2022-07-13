import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  background: #f7f9ff;
  @media (max-width: 1470px) {
  }
`;

export const OverviewGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;
