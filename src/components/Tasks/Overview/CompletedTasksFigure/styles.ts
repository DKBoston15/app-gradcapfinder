import styled from 'styled-components';

export const GridItem = styled.div.attrs((props) => ({
}))`
  grid-column: 1 / 3;
  grid-row: 2;
  background: #fff;
  border: 1px solid #EBF1FB;
  border-bottom: 4px solid #EBF1FB;
  display: flex;
  flex-direction: column;
  @media (max-width: 1470px) {
    display: none;
  }
`;

export const FigureContainer = styled.div.attrs((props) => ({
}))`
  margin: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const SubFigureContainer = styled.div.attrs((props) => ({
}))`
width: 85%;
max-width: 80rem;
`;

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

export const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  height: 100%;
`