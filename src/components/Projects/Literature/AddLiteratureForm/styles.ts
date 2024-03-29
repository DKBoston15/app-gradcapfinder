import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Chips } from 'primereact/chips';

export const CustomInputText = styled(InputText)`
  width: 100%;
`;

export const CustomChips = styled(Chips)`
  width: 100%;
`;

export const FloatingLabelContainer = styled.span`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FirstFloatingLabelContainer = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SecondFloatingLabelContainer = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 850px) {
    margin-top: 2rem;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  @media (max-width: 850px) {
    flex-direction: column;
  }
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

export const ChipContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ChipTooltip = styled.i`
  margin-left: 0.5rem;
  margin-top: 1.5rem;
`;
