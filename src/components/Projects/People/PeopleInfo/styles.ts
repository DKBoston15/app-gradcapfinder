import styled from 'styled-components';
import { Dropdown } from 'primereact/dropdown';

export const Container = styled.div.attrs((props) => ({
  style: {
    background: '#ecf0f1',
  },
}))`
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 2rem;
  height: 100vh;
  width: 25rem;
  overflow: auto;
`;

export const CustomInput = styled.span`
  margin: 1rem 0;
  width: 100%;
`;

export const ReferenceTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 18px;
`;

export const DOICheckbox = styled.div`
  margin-top: 1rem;
  padding-bottom: 2rem;
`;

export const PageContainer = styled.div`
  display: flex;
`;

export const ReferenceDateInfo = styled.div`
  display: flex;
`;

export const ReferenceInput = styled.span`
  margin: 0.75rem 0;
`;

export const ReferenceContainer = styled.div`
  line-height: 25px;
  background: #dfe6e9;
  padding: 0.5rem;
  border-radius: 6px;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  padding-left: 0.2rem;
  font-size: 18px;
`;

export const CustomDropdown = styled(Dropdown)`
  width: 99%;
  max-width: 99%;
  margin: 0.8rem 0;
`;

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

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const LinkInput = styled.div`
  display: flex;
  margin: 1.2rem 0;
  width: 91%;
`;

export const FlexGapContainer = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
