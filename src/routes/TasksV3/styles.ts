import styled from "styled-components";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Panel } from 'primereact/panel';



export const CustomPanel = styled(Panel)`
  border: none !important;
`

export const CustomDataTable = styled(DataTable)`
  width: 100%;
  height: 100vh;
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
  @media (max-width: 1760px) {
    flex-direction: column;
    }
`

export const NotFoundItem = styled.span`
    font-size: 0.8rem;
    margin-top: 0.4rem;
    font-weight: normal;
`

export const Container = styled.main`
width: 100%;
background: #f7f9ff;
height: 100vh;
@media (max-width: 1470px) {
}
`;

export const RowOne = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  @media (max-width: 1760px) {
    justify-content: center;
    }
`

export const RowTwo = styled.div`
display: flex;
justify-content: space-evenly;
width: 100%;
@media (max-width: 1760px) {
  justify-content: center;
  margin-top: 1rem;
  }
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