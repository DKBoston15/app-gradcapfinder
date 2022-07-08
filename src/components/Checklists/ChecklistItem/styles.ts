import styled from "styled-components";
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';

export const ChecklistItemContainer = styled.div`
    padding: 1rem;
    width: 20rem;
    height: 13rem;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);

`

export const CustomMultiCheckbox = styled(MultiStateCheckbox)`
  & .p-checkbox-box {
    border-color: ${props => props.active === 'done' ? "#2ECC71 !important" : props.active === 'inProgress' ? "#2381FE !important" : props.active === 'blocked' ? 'red !important' : ''};
    background: ${props => props.active === 'done' ? "#2ECC71 !important" : props.active === 'inProgress' ? "#2381FE !important" : props.active === 'blocked' ? 'red !important' : ''};
  }
  margin-left: ${props => props.nestedLevels === 1 ? '1rem' : props.nestedLevels === 2 ? '2rem' : props.nestedLevels === 3 ? '3rem' : props.nestedLevels === 4 ? '4rem' : props.nestedLevels === 5 ? '5rem' : ''}
`

export const LegendCheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0.75rem 0.5rem;
`

export const CheckboxText = styled.p`
    padding-left: 0.5rem;
`

export const TodoText = styled.div`
  margin-left: 2.4rem;
`

export const LegendContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
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
  }`

export const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;  
  margin: 1rem 1rem;
`

export const DeleteAction = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`

export const Name = styled.div`
font-size: 1.4rem;
`