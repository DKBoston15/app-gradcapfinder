import styled from 'styled-components';

// export const GridItem = styled.div`
// grid-column: 1 / 3;
// grid-row: 2;
// background: #fff;
// border: 1px solid #EBF1FB;
// border-bottom: 4px solid #EBF1FB;
// padding: 1rem;
// align-items: center;
// display: flex;
// flex-direction: column;
// @media (max-width: 1470px) {
//     display: none;
//   }
// `;

export const GridItem = styled.div.attrs((props) => ({
  style: {
    // width: props.navVisible ? '80%' : '100%'
  },
}))`
  grid-column: 1 / 3;
  grid-row: 2;
  background: #fff;
  border: 1px solid #EBF1FB;
  border-bottom: 4px solid #EBF1FB;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 1470px) {
    display: none;
  }
`;

// export const FigureContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 2rem;
//   position: relative;
//   width: 90%;
// `
export const FigureContainer = styled.div.attrs((props) => ({
  // style: {
  //   width: props.navVisible ? '85%' : '100%'
  // },
}))`
  margin: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const SubFigureContainer = styled.div.attrs((props) => ({
  // style: {
  //   width: props.navVisible ? '100%' : '100%'
  // },
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