import {
  Container,
  Card,
  Header,
  SubHeader,
  CarouselContainer,
  PageHeader,
  CustomCarousel,
  IntroductionContainer,
  OverviewContainer,
} from './RouteStyles/overview.styles';
import React from 'react';

export default function Overview() {
  return (
    <Container>
      <PageHeader>Introduction</PageHeader>
      <IntroductionContainer>
        Less than 2% of the world’s current population possess their doctorate, an indicator of
        individuals possessing both interests and skills in academic reasoning (i.e., philosophy)
        and research. The ancient birth of these interests and skills remains a matter of
        contention. Scholars often identify different cultural points in the history of humanity as
        that birth, including: Western traditions of Plato’s Academy and Aristotle’s Lyceum; Middle
        Eastern traditions of Akkadian thought found in the Dialogue of Pessimism, Egyptian beliefs
        in the Maxims of Ptahtoep, and Zoroastrianism; Eastern traditions of Buddhism, Confucianism,
        and Jainism; or the lost American traditions of the Aztec, Mayan, Incan, and Tupi-Guarani
        peoples. Regardless, many of these same scholars view the advent of academic journals in
        1665 (i.e., Le Journal des Savants and Philosophical Transactions of the Royal Society) and
        the first peer reviewed journal in 1733 (i.e., Medical Essays and Observations) as points of
        reference for the modern birth of academic reasoning and research. These points likely hold
        value in the strength of common terms used by all interested parties around which to
        coalesce their interests and skills. <br />
        <br />
        Following this perspective, the developers of Quester strived to identify language common to
        all learners wishing to develop their own interests and skills in academic reasoning and
        research.
      </IntroductionContainer>
      <PageHeader>Overview</PageHeader>
      <OverviewContainer>
        Regardless of content field, common terms exist in the language used by individuals (e.g.,
        PhDs) possessing interests and skills in academic reasoning and research. We identified four
        major and thirteen minor terms. <br />
        <br />
        Major terms (i.e., Research, Analysis, Professionalism, and Writing) describe broad
        activities in which people, regardless of interests and skills, participate on a daily
        basis. For example, before making major purchases (e.g., house or car), many people often
        spend time conducting research on the costs and benefits of making those purchases.
        Similarly, PhDs often spend years in conducting research to establish positions or generate
        conclusions within their respective fields. For all major terms, we provide a statement
        defining the term, expressing the purpose of the term, and contextualizing the term during
        research. In addition, we provide answers to several questions we often hear from people as
        they work toward completing their respective degrees.
        <br />
        <br />
        In contrast, minor terms (e.g., Paradigms, Designs, Figures, and Conceptual Models) describe
        tools situated within the Major terms that require specialized expertise associated with
        specific content fields. For all minor terms, we provide statement defining and expressing
        the purpose of the term. In addition, we provide a visualization with examples of the term
        as well as links to authoritative resources.
      </OverviewContainer>
    </Container>
  );
}
