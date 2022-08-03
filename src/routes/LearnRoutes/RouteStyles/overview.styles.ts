import styled from 'styled-components';
import { Carousel } from 'primereact/carousel';
import { Card as PrimeCard } from 'primereact/card';

export const CustomCard = styled.div`
  width: 300px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(64, 68, 82, 0.16) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  padding: 1rem;
  @media (max-width: 1570px) {
    width: 100%;
  }
  @media (max-width: 450px) {
    width: 100%;
  }
  &:hover {
    transform: scale(1.01);
  }
`;

export const FirstCard = styled(CustomCard)`
  border-left: 15px solid #2381fe;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 1rem;
`;

export const Container = styled.main`
  background: #f7f9ff;
  padding: 0 2rem;
  max-width: 1400px;
  padding-bottom: 2rem;
  @media (max-width: 450px) {
    padding: 0.5rem;
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
`;

export const Card = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #ebf1fb;
  border-bottom: 4px solid #ebf1fb;
  height: 15rem;
  margin: 0 1rem;
`;
export const PageHeader = styled.h1`
  font-size: 32px;
  color: #1a1f36
  line-height: 26px;
  padding-bottom: 1rem;
  padding-top: 1rem;
  font-weight: bold;
`;
export const Header = styled.h2`
  font-size: 21px;
  color: #1a1f36
  line-height: 26px;
  padding-bottom: 1rem;
`;

export const SubHeader = styled.h3`
  font-size: 24px;
  color: #3c4257;
  line-height: 26px;
  padding-bottom: 1.5rem;
`;

export const CarouselContainer = styled.div`
  & .p-carousel-prev {
    display: none;
  }
  & .p-carousel-next {
    display: none;
  }
  margin: 3rem 0;
`;

export const FigureIdentifier = styled.span`
  font-weight: bold;
`;

export const FigureName = styled.span`
  font-style: italic;
`;

export const CustomImage = styled.img`
  margin: 1rem 0;
`;

export const IntroductionContainer = styled.div`
  margin-bottom: 2rem;
  font-size: 1.2rem;
  line-height: 24px;
  width: 80%;
  color: #3c4257;
  a {
    color: #2381fe;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  color: #3c4257;
  line-height: 26px;
  padding-top: 1.5rem;
`;

export const OverviewContainer = styled.div`
  font-size: 1.2rem;
  line-height: 24px;
  width: 80%;
  color: #3c4257;
`;

export const RoleOfPhilosophyContainer = styled.div`
  font-size: 1.2rem;
  line-height: 24px;
  width: 80%;
  color: #3c4257;
  margin-bottom: 2rem;
`;

export const FigureContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WIPBanner = styled.div`
  padding: 0.8rem;
  border: 1px solid #e3e8ee;
  margin-bottom: 3rem;
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  @media (max-width: 1570px) {
    flex-direction: column;
  }
`;

export const CardRow = styled.div`
  @media (max-width: 1570px) {
    display: flex;
    flex-direction: column;
  }
`;
