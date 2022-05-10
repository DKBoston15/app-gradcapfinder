import styled from 'styled-components';

export const Container = styled.main`
  padding-left: 24rem;
  padding-top: 1.3rem;
  padding-right: 8rem;
  width: 100%;
  background: #f7f9ff;
  height: 100%;
  @media (max-width: 768px) {
    padding-left: 18rem;
  }
`;

export const Card = styled.div`
    padding: 1rem;
    background: white;
    border-radius: 6px;
    border: 1px solid #EBF1FB;
    border-bottom: 4px solid #EBF1FB;
    height: 15rem;
    margin: 0 1rem;
`
export const PageHeader = styled.h1`
  font-size: 32px;
  color: #1a1f36
  line-height: 26px;
  padding-bottom: 1rem;
`
export const Header = styled.h2`
  font-size: 21px;
  color: #1a1f36
  line-height: 26px;
  padding-bottom: 1rem;
`

export const SubHeader = styled.h3`
  font-size: 16px;
  color: #3c4257
  line-height: 26px;
  padding-bottom: 1.5rem;
`

export const CarouselContainer = styled.div`
  & .p-carousel-prev {
    display: none;
  }
  & .p-carousel-next {
    display: none;
  }
  margin: 3rem 0;
`