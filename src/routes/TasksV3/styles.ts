import styled from "styled-components";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Panel } from 'primereact/panel';



export const CustomPanel = styled(Panel)`
  border: none !important;
`

export const CustomDataTable = styled(DataTable)`
  width: 100%;
  height: calc(100% - 70px);
  border: 1px solid lightgray;
  overflow: auto;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
`

export const OverdueIcon = styled.i`
  color: red;
  margin-right: 0.5rem;
`

export const HeaderButtonNewTask = styled(Button)`
  background: #2381FE !important;
  border: none !important;
  height: 40px;
`

export const RightPanel = styled.div`
  display: flex;
`

export const FilterButton = styled(Button)`
  margin-left: 0.5rem;
  height: 40px;
`

export const Badge = styled.span`
  padding: 0.3rem;
`

export const Search = styled.div`
  margin-right: 1.5rem;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const NotFoundItem = styled.span`
    font-size: 0.8rem;
    margin-top: 0.4rem;
    font-weight: normal;
`

export const Container = styled.main`
width: 100%;
background: #f7f9ff;
`;

export const RowOne = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  padding-bottom: 0.5rem;
  gap: 1rem;
`

export const RowTwo = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  gap: 1rem;
`

export const SubContainer = styled.div`
    overflow: auto;
    padding-left: 5rem;
    width: 100%;
    background: #f7f9ff;
    height: 100%;
    @media (max-width: 1470px) {
    padding-left: 24rem;
    justify-content: space-between;
    }
    @media (max-width: 1470px) {
    padding-left: 4rem;
    }
    @media (max-width: 850px) {
    padding-left: 2rem;
    padding-right: 1rem;
    }
`

export const PageHeader = styled.div`
  font-size: 22px;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
`

export const TaskButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2ECC71;
  border: none;
  &:hover {
      background-color: #16A34A !important;
  }
  height: 2rem;
  width: 30px !important;
`

export const TaskButtonTrash = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E74C3C;
  border: none;
  margin: 0-re0.5rem;
  &:hover {
      background-color: #cc2b19 !important;
  }
  height: 2rem;
  width: 30px !important;
`

export const ButtonContainer = styled.div`
display: flex;
width: 100%;
justify-content: space-evenly;
`

export const KBD = styled.div`
background-color: #eee;
border-radius: 3px;
border: 1px solid #b4b4b4;
box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 2px 0 0 rgba(255, 255, 255, .7) inset;
color: #333;
display: inline-block;
font-size: .85em;
font-weight: 700;
line-height: 1;
padding: 2px 4px;
white-space: nowrap;
`

export const MultiSortInstructions = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  font-size: 14px;
  margin-right: 1rem; 
`

export const KeyboardContainer = styled.div`
  margin-bottom: 0.2rem;
`