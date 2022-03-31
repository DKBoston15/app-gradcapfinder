import styled from 'styled-components';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';

export const Container = styled.div.attrs((props) => ({
  style: {
    background: props.theme.drawerColor,
    color: props.theme.drawerTextColor,
  },
}))`
  padding: 1rem 2rem;
`;

export const ProfileContainer = styled.main.attrs((props) => ({
  style: {
    background: props.theme.drawerColor,
  },
}))`
  height: 100%;
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
    width: 100%;
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

export const BGContainer = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.theme.background,
    color: props.theme.patternTextColor,
    background: `repeating-linear-gradient(
      45deg,
      ${props.theme.patternColor1},
      ${props.theme.patternColor1} 2.5px,
      ${props.theme.patternColor2} 2.5px,
      ${props.theme.patternColor2} 12.5px
    )`,
  },
}))`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 2rem;
  font-size: 32px;
  font-weight: bold;
  line-height: 3rem;
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    font-size: 24px !important;
    line-height: 2rem;
  }
`;

export const WelcomeText = styled.div`
  padding-left: 4rem;
  @media (max-width: 1000px) {
    padding-left: 2rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.8rem;
  @media (max-width: 1000px) {
    flex-direction: column;
    margin-top: 1rem;
  }
`;

export const InputContainerSecond = styled(InputContainer)`
  @media (max-width: 1000px) {
    flex-direction: column;
    margin-top: 0rem;
  }
`;

export const CustomInput = styled(InputText)`
  width: 17rem;
  @media (max-width: 1000px) {
    width: 100% !important;
  }
`;

export const FieldOfStudyInput = styled(CustomInput)`
  width: 100%;
`;

export const FloatingLabelContainer = styled.span`
  @media (max-width: 1000px) {
    margin: 1rem 0;
  }
`;

export const CustomInputMask = styled(InputMask)`
  width: 17rem;
  @media (max-width: 1000px) {
    width: 100% !important;
  }
`;
