import {
  Container,
  PageHeader,
  IntroductionContainer,
  OverviewContainer,
  RoleOfPhilosophyContainer,
  FigureIdentifier,
  FigureName,
  CustomImage,
  FigureContainer,
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
        Eastern traditions of Akkadian thought found in the{' '}
        <a href="https://www.gatewaystobabylon.com/myths/texts/classic/dialoguepessimism.htm">
          Dialogue of Pessimism
        </a>
        , Egyptian beliefs in the{' '}
        <a href="https://www.ganino.com/anteanus/the_maxims_of_ptahhotep">Maxims of Ptahtoep</a>,
        and Zoroastrianism; Eastern traditions of Buddhism, Confucianism, and Jainism; or the lost
        American traditions of the Aztec, Mayan, Incan, and Tupi-Guarani peoples. Regardless, many
        of these same scholars view the advent of academic journals in 1665 (i.e.,{' '}
        <a href="https://www.persee.fr/collection/jds">Le Journal des Savants</a> and{' '}
        <a href="https://royalsocietypublishing.org/toc/rstl/1665/1/7">
          Philosophical Transactions of the Royal Society
        </a>
        ) and the first peer reviewed journal in 1733 (i.e., Medical Essays and Observations) as
        points of reference for the modern birth of academic reasoning and research. These points
        likely hold value in the strength of common terms used by all interested parties around
        which to coalesce their interests and skills. Following this perspective, the developers of
        Quester strived to identify language common to all learners wishing to develop their own
        interests and skills in academic reasoning and research.
      </IntroductionContainer>
      <FigureIdentifier>Figure 1. </FigureIdentifier>
      <FigureName>
        Distribution of Women and Men with a Doctoral Degree across European Countries in 2019
      </FigureName>
      <CustomImage src="/distributionGraph.png" width="70%" height="25%" />
      <PageHeader>Role of Philosophy</PageHeader>
      <RoleOfPhilosophyContainer>
        At the center of all research lies philosophy (see Figure 2). In defining philosophy,
        researchers identify six common branches: (a) metaphysics, (b) epistemology, (c)
        methodology, (d) logic, (e) ethics, and (f) aesthetics. All of these branches informed the
        development of Quester. For example, our understanding about the nature of research and
        becoming researchers – metaphysical concerns – led us to discuss the need for an app to
        assist individuals wishing to develop their own interests and skills in academic reasoning
        and research. In addition, our earlier work with researchers informed our knowledge of how
        they went about knowing truth – an epistemology question – in their content fields. Finally,
        we needed to determine which conventions of research – philosophical methodology – most
        effectively support the development of researchers. These considerations, and more,
        exemplify the role of philosophy in creating Quester.
      </RoleOfPhilosophyContainer>
      <FigureContainer>
        <FigureName>
          <FigureIdentifier>Figure 2. </FigureIdentifier>Illustration of the Major Branches within
          the Field of Philosophy
        </FigureName>
        <CustomImage src="/Branches of Philosophy.png" width="70%" height="25%" />
      </FigureContainer>

      <PageHeader>Overview</PageHeader>
      <OverviewContainer>
        Regardless of content field, common terms exist in the language used by individuals (e.g.,
        PhDs) possessing interests and skills in academic reasoning and research. We identified four
        major and thirteen minor terms. Major terms (i.e., Research, Analysis, Professionalism, and
        Writing) describe broad activities in which people, regardless of interests and skills,
        participate on a daily basis. For example, before making major purchases (e.g., house or
        car), many people often spend time conducting research on the costs and benefits of making
        those purchases. Similarly, PhDs often spend years in conducting research to establish
        positions or generate conclusions within their respective fields. For all major terms, we
        provide a statement defining the term, expressing the purpose of the term, and
        contextualizing the term during research. In addition, we provide answers to several
        questions we often hear from people as they work toward completing their respective degrees.
        In contrast, minor terms (e.g., Paradigms, Designs, Figures, and Conceptual Models) describe
        tools situated within the Major terms that require specialized expertise associated with
        specific content fields. For all minor terms, we provide statements defining and expressing
        the purpose of the term. In addition, we provide a visualization with examples of the term
        as well as links to authoritative resources.
      </OverviewContainer>
    </Container>
  );
}
