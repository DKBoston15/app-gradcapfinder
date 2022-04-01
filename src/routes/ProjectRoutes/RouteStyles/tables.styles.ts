import styled from 'styled-components';

export const Container = styled.div.attrs((props) => ({
  style: {
    // background: props.theme.color,
    background: '#e7e7e7',
    // color: props.theme.textColor,
  },
}))`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;
