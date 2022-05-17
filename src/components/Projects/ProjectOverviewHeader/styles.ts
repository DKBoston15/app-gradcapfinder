import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 1350px) {
    padding-right: 3rem;
  }
`;

export const Title = styled.h2`
font-size: 20px;
`