import styled from 'styled-components';
import { Carousel } from 'primereact/carousel';

export const Container = styled.main`
  padding-left: 24rem;
  padding-top: 1.3rem;
  padding-right: 8rem;
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
`;

export const CustomCarousel = styled(Carousel)`
& .p-carousel-items-container {
  flex-direction: row;
}
@media (max-width: 1470px) {

}
@media (max-width: 1470px) {
  & .p-carousel-items-container {
    flex-direction: column;
  }
}
@media (max-width: 850px) {
  & .p-carousel-items-container {
    flex-direction: column;
  }
}
`

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

export const IntroductionContainer = styled.div`
  margin-bottom: 2rem;
  font-size: 1.2rem;
  line-height: 24px;
  width: 80%;
  color: #3c4257;
`

export const OverviewContainer = styled.div`
  font-size: 1.2rem;
  line-height: 24px;
  width: 80%;
  color: #3c4257;
`