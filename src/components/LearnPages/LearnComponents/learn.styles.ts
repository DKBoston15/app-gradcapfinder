import styled from "styled-components";
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 5rem;
`

export const Page = styled.div`
    padding-right: 5rem;
    @media (max-width: 850px) {
        padding-right: 1rem;
      }
`

export const Header = styled.h1`
    font-size: 32px;
`

export const SubHeader = styled.h2`
    font-size: 24px;
    padding: 1rem 0;
`

export const ItemHeader = styled.h3`
    font-size: 20px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`

export const Paragraph = styled.p`
    font-size: 1.2rem;
    color: #3c4257;
    line-height: 26px;
    padding-bottom: 0.5rem;
`

export const CustomDivider = styled(Divider)`
    border: 1px solid lightgray !important;
`

export const NestedSection = styled.div`
    padding-left: 2rem;
`

export const FigureIdentifier = styled.span`
      font-weight: bold;
`

export const FigureName = styled.span`
      font-style: italic;
`

export const List = styled.ul`
    list-style: inside;
`

export const ListItem = styled.li`
      padding: 0.5rem 0.5rem;
      font-size: 1.2rem;
`

export const Question = styled.h4`
      font-size: 1.4rem;
      padding-top: 1rem;
      padding-bottom: 0.5rem;
`

export const CustomButton = styled(Button)`
      margin: 0 0.5rem;
`

export const ButtonContainer = styled.div`
      margin-top: 1rem;
`

export const Table = styled.table`

`;

export const TableHead = styled.thead`

`;

export const TableBody = styled.tbody`

`;

export const TableRow = styled.tr`

`

export const TableData = styled.td`
    padding: 0.5rem;
    font-size: 1.2rem;
    border: 1px solid #2381FE;
`

export const TableHeader = styled.th`
      white-space: nowrap;
      font-size: 1.4rem;
      padding: 0.5rem;
      border: 1px solid #2381FE;
      background: #2381FE;
      color: white;
`