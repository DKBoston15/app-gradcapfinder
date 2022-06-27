import styled from "styled-components";
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';

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
    margin: 0 0.5rem;
`

export const CheckboxText = styled.p`
    padding-left: 0.5rem;
`

export const Title = styled.h2`
  font-size: 1.5rem;
  padding-bottom: 1rem;
`

export const MoveIcon = styled.i`
  font-size: 1.4rem;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.1)
  }
`

export const MoveContainer = styled.div`
  visibility: hidden;
  display: flex;
`

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0;
    font-size: 1.2rem;
    padding: 0.2rem;
    &:hover ${MoveContainer} {
      visibility: visible;
    }
`