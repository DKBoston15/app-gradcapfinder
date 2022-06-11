import styled from 'styled-components';

export const Container = styled.main`
  padding-left: 24rem;
  padding-top: 1.3rem;
  padding-right: 8rem;
  width: 100%;
  height: 100%;
  background: #f7f9ff;
  @media (max-width: 1470px) {
    padding-left: 1rem ;
    padding-right: 1rem;
    padding-bottom: 4rem;
  }
`;

export const Header = styled.div`
  display:flex;
  align-items: center;
  font-size: 20px;
  padding-bottom: 1rem;
`

export const Icon = styled.i`
  font-size: 1.3rem;
  padding-right: 1rem;
`