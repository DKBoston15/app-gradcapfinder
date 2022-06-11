import styled from 'styled-components';

export const GridItem = styled.div`
grid-column: 1 / 3;
grid-row: 1;
background: #fff;
border: 1px solid #EBF1FB;
border-bottom: 4px solid #EBF1FB;
padding: 1rem;
display: flex;
flex-direction: column;
`;

export const BoxContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 1470px) {
        flex-direction: column;
      }
`

export const Box = styled.div`
width: 100%;
height: 10rem;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
border: 1px solid lightgray;
border-radius: 6px;
margin: 0 1rem;
@media (max-width: 1470px) {
    margin: 1rem 0;
  }
`

export const BoxTitle = styled.div`
font-size: 18px;
margin-top: -2rem;
padding-bottom: 2rem;
text-align:center;
`