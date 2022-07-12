import styled from "styled-components";

export const ProjectItemContainer = styled.div`
    padding: 1rem;
    width: 20rem;
    height: 15rem;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    word-wrap: break-word;
    overflow-y: scroll;

`

export const CheckboxText = styled.p`
    padding-left: 0.5rem;
`

export const TodoText = styled.div`
  margin-left: 2.4rem;
`

export const TrashIcon = styled.i`
  color: white;
  padding-right: 0.5rem;
`

export const DeleteContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 1rem;
  cursor: pointer;
`

export const DeleteItem = styled.div`
  display: inline-block;
  background: #1E1F21;
  padding: 0.4rem;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  &:hover {
    background: #eb4d4b;
  }
`

export const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;  
  &:first-child {
    margin-right: 1rem;
    margin-left: 0rem;
 }
 @media (max-width: 1185px) {
  &:first-child {
    margin: 1rem 1rem;
 }
 }
  margin: 1rem 1rem;
`

export const DeleteAction = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`

export const Title = styled.div`
font-size: 1.3rem;
padding-bottom: 0.5rem;
`

export const Name = styled.div`
font-size: 1.4rem;
`