import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Chips } from "primereact/chips";

export const Container = styled.div``;

export const CustomInputText = styled(InputText)`
  width: 98%;
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
  width: 98%;
  max-width: 98%;
`;

export const CustomMultiSelect = styled(MultiSelect)`
  width: 98%;
  color: black;
`;

export const PageInputs = styled(InputText)`
  width: 98%;
`;

export const ReferenceInputs = styled(InputText)`
  width: 98%;
`;
