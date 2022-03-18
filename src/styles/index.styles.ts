import styled from 'styled-components';

export const MainContainer = styled.div`
  display: grid;
  column-gap: 2rem;
  grid-template-columns: 1fr;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  padding: 0 10%;
  flex-direction: column;
  @media (max-width: 400px) {
    padding: 2rem 5%;
  }
`;

export const ImageContainer = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  background: rgb(60, 65, 203);
  background: linear-gradient(
    235deg,
    rgba(60, 65, 203, 1) 0%,
    rgba(17, 21, 110, 1) 100%
  );
  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  text-align: left;
  width: 100%;
  padding-bottom: 4rem;
  max-width: 700px;
`;

export const Details = styled.p`
  font-size: 2rem;
  text-align: left;
  width: 100%;
  padding-bottom: 1rem;
  max-width: 700px;
`;

export const DetailsContainer = styled.div`
  text-align: left;
  width: 100%;
  padding-bottom: 3rem;
  max-width: 700px;
`;

export const DetailsSubtitle = styled.p`
  font-size: 1rem;
  text-align: left;
  width: 100%;
  color: #9fa4af;
  max-width: 700px;
`;
