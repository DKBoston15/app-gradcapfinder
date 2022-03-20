import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

export const Container = styled.main.attrs((props) => ({
  style: {
    background: props.theme.drawerColor,
    color: props.theme.drawerTextColor,
  },
}))`
  padding: 2rem 2rem;
  height: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.8rem;
`;

export const CustomInput = styled(InputText)`
  width: 17rem;
`;

export const FieldOfStudyInput = styled(CustomInput)`
  width: 100%;
`;

export const FieldOfStudyContainer = styled.div`
  padding-top: 1.8rem;
  padding-bottom: 0.6rem;
`;

export const CustomDropdown = styled(Dropdown)`
  width: 20rem;
  margin-top: 0.5rem;
  color: black;
  @media (max-width: 1000px) {
    width: 15rem;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
`;

export const SwitchLabel = styled.label`
  padding-left: 1rem;
`;

export const SwitchSectionHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 1rem 0;
`;

export const SwitchSection = styled.div`
  padding-bottom: 2rem;
  border-bottom: 1px solid lightgray;
`;

export const SwitchTopHR = styled.div`
  border-bottom: 1px solid lightgray;
  padding: 0.5rem 0;
`;
