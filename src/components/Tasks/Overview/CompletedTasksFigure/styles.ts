import styled from 'styled-components';

export const GridItem = styled.div`
grid-column: 1 / 3;
grid-row: 2;
background: #fff;
border: 1px solid #EBF1FB;
border-bottom: 4px solid #EBF1FB;
padding: 1rem;
display: flex;
flex-direction: column;
`;

export const FigureContainer = styled.div`
height: 35rem;
margin-top: 2rem;
`

export const RangeContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

export const RangeLabel = styled.label`
padding-right: 1rem;
`

export const Title = styled.h3`
font-size: 20px;
`