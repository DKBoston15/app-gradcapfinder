import styled from 'styled-components';

export const NoteContainer = styled.div`
  padding: 1rem;
  border: 1px solid white;
  margin: 1rem 0;
  border-radius: 6px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 810px;
  overflow-wrap: break-word;
`;

export const Icon = styled.i.attrs((props) => ({
  style: {},
}))`
  margin: 0 0.3rem;
  font-size: 12px;
  cursor: pointer;
  /* &:hover {
    transform: scale(1.25);
    translate3d: (0px, 0px, 0px);
  } */
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1rem;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-bottom: 1rem;
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
`;
