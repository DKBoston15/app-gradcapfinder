import styled from 'styled-components';

export const Container = styled.main`
  padding: 1rem;
  width: 100%;
  background: #f7f9ff;
  min-height: 95vh;
  height: 100%;
  @media (max-width: 1470px) {
  }
`;

export const OverviewGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 90vh;
  gap: 1rem;
`;
