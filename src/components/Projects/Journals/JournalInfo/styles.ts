import styled from 'styled-components';
import { Dropdown } from 'primereact/dropdown';

export const CustomInput = styled.span`
  margin: 1.5rem 0;
`;

export const LinkInput = styled.span`
  margin: 0.75rem 0;
`;

export const CustomDropdown = styled(Dropdown)`
  width: 99%;
  max-width: 99%;
  margin-bottom: 0.8rem;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`
export const CheckboxContainer = styled.div`
  margin-top: 1rem;
  margin-left: 0.4rem;
  padding-bottom: 2rem;
  display: flex;
  align-items: center;
`;

export const CheckboxLabel = styled.label`
  padding-left: 0.5rem;
`;