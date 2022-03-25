import styled from "styled-components";

export const NoteContainer = styled.div`
  padding: 1rem;
  border: 1px solid lightgray;
  margin: 1rem 0;
  border-radius: 6px;
  background: #ecf0f1;
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled.i.attrs((props) => ({
  style: {},
}))`
  margin: 0 0.3rem;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
    translate3d: (0px, 0px, 0px);
  }
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
`;
