import styled from 'styled-components';

export const Icon = styled.i.attrs((props) => ({
  style: {
    color: props.theme.textColor,
  },
}))`
  font-size: 24px;
  padding: 2rem 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    translate3d: (0px, 0px, 0px);
  }
`;

export const Button = styled.div.attrs((props) => ({
  style: {
    background: props.theme.color,
    color: props.theme.textColor,
  },
}))`
  text-align: center;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 2rem;
`;

export const Container = styled.div.attrs((props) => ({
  style: {
    background: props.theme.color,
    color: props.theme.textColor,
  },
}))`
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  height: 100vh;
  position: fixed;
  @media (max-width: 1470px) {
    display: none;
  }
`;

export const LinkContainer = styled.div.attrs((props) => ({
  style: {
    background: props.theme.color,
    color: props.theme.textColor,
  },
}))`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  align-items: space-between;
  height: 95%;
  @media (max-width: 1470px) {
    display: none;
  }
`;


export const ImageContainer = styled.div`
  width: 100%;
  height: 90px;
`

export const OnboardingContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1470px) {
    display: none;
  }
`