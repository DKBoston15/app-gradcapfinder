import styled from 'styled-components';

export const Container = styled.main`
  padding-left: 1rem;
  @media (max-width: 1470px) {
  }
`;

export const OverviewGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  background: #f7f9ff;
  @media (max-width: 1470px) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
