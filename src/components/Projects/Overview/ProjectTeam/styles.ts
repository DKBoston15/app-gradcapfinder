import styled from 'styled-components';
import { Button } from 'primereact/button';

export const GridItem = styled.div`
grid-column: 3;
grid-row: 1 / 4;
padding: 1rem;
background: #fff;
border: 1px solid #EBF1FB;
border-bottom: 4px solid #EBF1FB;
`;  

export const Header = styled.h3`
font-size: 18px;
padding-bottom: 1rem;
`;

export const CardContainer = styled.div`
display: flex;
flex-direction: column;
overflow: auto;
height: 100%;
`

export const AddTeamMemberButton = styled(Button)`
    width: 17rem;
    font-size: 1rem;
    cursor: pointer;
`

export const AddTeamMemberButtonIcon = styled.i`
    margin-left: 1rem;
`