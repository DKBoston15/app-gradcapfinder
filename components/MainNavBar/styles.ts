import styled from 'styled-components';

export const Icon = styled.i`
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
  font-size: 18px;
  cursor: pointer;
`;

export const Container = styled.div.attrs((props) => ({
  style: {
    background: props.theme.color,
    color: props.theme.textColor,
  },
}))`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    display: none;
  }
`;
