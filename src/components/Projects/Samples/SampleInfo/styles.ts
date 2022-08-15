import styled from 'styled-components';
import { Calendar } from 'primereact/calendar';

export const CustomInput = styled.span`
  margin: 1rem 0;
  width: 100%;
`;

export const DateInput = styled.div`
  margin: 1rem 0;
  width: 100%;
`;

export const SampleDesignInput = styled.div`
  margin-top: 1.5rem;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const LinkInput = styled.div`
  display: flex;
  margin: 1rem 0;
  width: 91%;
`;

export const CustomCalendar = styled(Calendar)`
  width: 100%;
  height: 40px;
`;

export const ResponseRate = styled.div`
  padding-top: 1.5rem;
  padding-left: 0.5rem;
  @media (max-width: 550px) {
    padding-top: 0rem;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const FlexGapContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const PowerFlexGapContainer = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
