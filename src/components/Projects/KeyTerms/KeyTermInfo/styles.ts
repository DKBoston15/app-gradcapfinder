import styled from 'styled-components';

export const CustomInput = styled.span`
  margin: 1rem 0;
  width: 100%;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const LinkInput = styled.div`
  display: flex;
  margin: 0.5rem 0;
  width: 91%;
`;
export const CheckboxContainer = styled.div`
  margin-top: 0rem;
  margin-left: 0.4rem;
  padding-bottom: 2rem;
  display: flex;
  align-items: center;
`;

export const CheckboxLabel = styled.label`
  padding-left: 0.5rem;
`;

export const FlexGapContainer = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
