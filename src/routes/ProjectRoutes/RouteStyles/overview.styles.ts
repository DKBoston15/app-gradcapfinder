import styled from 'styled-components';

export const Container = styled.main`
  padding-left: 24rem;
  padding-top: 1.3rem;
  padding-right: 8rem;
  width: 100%;
  background: #f7f9ff;
  @media (max-width: 768px) {
    padding-left: 18rem;
  }
`;

export const OverviewGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 90vh;
  gap: 1rem;
  margin-top: 1rem;
  background: #f7f9ff;
`;
