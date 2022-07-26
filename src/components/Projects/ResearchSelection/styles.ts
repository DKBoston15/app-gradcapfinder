import styled from 'styled-components';

export const Container = styled.main`
  padding-left: 1rem;
  min-height: 85vh;
`;

export const Section = styled.div`
  display: flex;
  width: 95%;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 30px;
`;

export const SubTitle = styled.h4`
  font-size: 16px;
  color: #687385;
  margin-top: 2rem;
  padding-bottom: 1rem;
`;

export const CardContainer = styled.div`
  &:hover {
    transform: scale(1.01);
  }
  cursor: pointer;
`;

export const Card = styled.div`
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(64, 68, 82, 0.16) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  height: 160px;
  max-width: 600px;
  overflow: auto;
`;

export const CoreContainer = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const ResourcesContainer = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CardDescription = styled.div`
  padding-top: 1rem;
  color: #414552;
  font-size: 14px;
`;

export const Icon = styled.i`
  margin-right: 0.3rem;
`;
