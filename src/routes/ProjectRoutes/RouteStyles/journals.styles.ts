import styled from 'styled-components';

export const Container = styled.div.attrs((props) => ({
  style: {
    // background: props.theme.color,
    background: '#f7f9ff',
    // color: props.theme.textColor,
  },
}))`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;
