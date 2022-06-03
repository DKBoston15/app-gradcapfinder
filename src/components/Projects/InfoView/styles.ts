import styled from 'styled-components';

export const Container = styled.div.attrs(() => ({
  style: {
    // background: props.theme.color,
    background: '#fff',
    // color: props.theme.textColor,
  },
}))`
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 2rem;
  height: 100%;
  width: 20rem;
  border-left: 1px solid #EBF1FB;
  border-right: 1px solid #EBF1FB;
  position: fixed;
  right: 0rem;
  overflow: auto;
  @media (max-width: 1670px) {
    position: static
  }
  @media (max-width: 1000px) {
    display: none;
  }
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
  margin-bottom: 5rem;
  padding-left: 0.2rem;
  font-size: 18px;
`;
