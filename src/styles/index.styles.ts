import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background: #18191d;
`;

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 0 5rem;
  flex-direction: column;
  @media (max-width: 400px) {
    padding: 2rem 5%;
  }
  background: #222428;
  border: 1px rgba(255, 255, 255, 0.03) solid;
  color: white;
  border-radius: 6px;
`;

export const Title = styled.div`
  max-width: 200px;
  padding-bottom: 6rem;
  margin-top: -12rem;
  filter: brightness(0) invert(1);
`;

export const Details = styled.p`
  font-size: 2rem;
  text-align: center;
  width: 100%;
  padding-bottom: 1rem;
  max-width: 700px;
`;

export const DetailsContainer = styled.div`
  text-align: center;
  width: 100%;
  padding-bottom: 3rem;
  max-width: 700px;
`;

export const DetailsSubtitle = styled.p`
  font-size: 1rem;
  text-align: center;
  width: 100%;
  color: #9fa4af;
  max-width: 700px;
`;
