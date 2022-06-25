import styled from 'styled-components';

export const Container = styled.div.attrs((props) => ({
  style: {
    // background: props.theme.color,
    background: '#f7f9ff',
    // color: props.theme.textColor,
  },
}))`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-left: 16rem;
  @media (max-width: 1470px) {
    padding-left: 18rem;
    justify-content: space-between;
  }
  @media (max-width: 1470px) {
    padding-left: 4rem;
  }
  @media (max-width: 850px) {
    padding-left: 1rem;

    padding-right: 1rem;
  }
`;
