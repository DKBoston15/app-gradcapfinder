import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Chips } from 'primereact/chips';

export const CustomInputText = styled(InputText)`
  width: 100%;
  height: 3rem;
`;

export const CustomChips = styled(Chips)`
  width: 98%;
`;

export const FloatingLabelContainer = styled.span`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const CheckboxContainer = styled.div`
  margin-top: 1rem;
  margin-left: 0.4rem;
`;

export const CheckboxLabel = styled.label`
  padding-left: 0.5rem;
`;

export const FirstFloatingLabelContainer = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CustomDropdown = styled(Dropdown)`
  width: 100%;
  max-width: 100%;
`;

export const CustomMultiSelect = styled(MultiSelect)`
  width: 100%;
  color: black;
`;

export const PageInputs = styled(InputText)`
  width: 100%;
`;

export const ReferenceInputs = styled(InputText)`
  width: 100%;
`;
