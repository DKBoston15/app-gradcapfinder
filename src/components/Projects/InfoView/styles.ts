import styled from 'styled-components';

export const Container = styled.div.attrs(() => ({
  style: {
    // background: props.theme.color,
    background: '#ecf0f1',
    // color: props.theme.textColor,
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
  margin: 1.5rem 0;
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
