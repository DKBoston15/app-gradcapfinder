import styled from 'styled-components';
import { Carousel } from 'primereact/carousel';

export const Container = styled.main`
  background: #f7f9ff;
  padding: 0 2rem;
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
  padding-top: 1rem;
`
export const Header = styled.h2`
  font-size: 21px;
  color: #1a1f36
  line-height: 26px;
  padding-bottom: 1rem;
`

export const SubHeader = styled.h3`
  font-size: 19px;
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

export const FigureIdentifier = styled.span`
      font-weight: bold;
`

export const FigureName = styled.span`
      font-style: italic;
`

export const CustomImage = styled.img`
  margin: 1rem 0;
`

export const IntroductionContainer = styled.div`
  margin-bottom: 2rem;
  font-size: 1.2rem;
  line-height: 24px;
  width: 80%;
  color: #3c4257;
  a {
    color: #2381FE;
  }
`

export const OverviewContainer = styled.div`
  font-size: 1.2rem;
  line-height: 24px;
  width: 80%;
  color: #3c4257;
`

export const RoleOfPhilosophyContainer = styled.div`
font-size: 1.2rem;
line-height: 24px;
width: 80%;
color: #3c4257;
margin-bottom: 2rem;
`

export const FigureContainer = styled.div`
  display: flex;
  flex-direction: column;
`