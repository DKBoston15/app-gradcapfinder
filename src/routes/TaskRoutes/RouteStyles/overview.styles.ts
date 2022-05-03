import styled from 'styled-components';

export const Container = styled.main`
  padding-left: 2rem;
  padding-top: 1.3rem;
  padding-right: 8rem;
  width: 100%;
  overflow: auto;
  background: #f7f9ff;
  height: 100vh;
`;

export const OverviewGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 90vh;
  gap: 1rem;
  margin-top: 1rem;
`;
