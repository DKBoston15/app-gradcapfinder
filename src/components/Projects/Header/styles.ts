import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const OverviewContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1185px) {
  }
`;

export const ButtonContainer = styled.div``;

export const IsSharedLabel = styled.div`
  background: #22c55e;
  color: #fff;
  padding: 0.65625rem 1.09375rem;
  margin-left: 1rem;
  border-radius: 6px;
  opacity: 100%;
`;

export const ShareLabel = styled.div`
  background: transparent;
  color: black;
  border: 1px solid black;
  padding: 0.65625rem 1.09375rem;
  margin-left: 1rem;
  border-radius: 6px;
  opacity: 100%;
`;
