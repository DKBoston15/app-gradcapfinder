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
  SubHeader,
  WIPBanner,
  SectionTitle,
  CardContainer,
  CardRow,
  CustomCard,
  Title,
  FirstCard,
  Arrow,
  AnalysisLine,
  ResearchLine,
  ProfessionalismLine,
  WritingLine,
} from './RouteStyles/overview.styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Overview() {
  const navigate = useNavigate();
  return (
    <Container>
      <PageHeader>Knowledge Base </PageHeader>
      <SubHeader>
        Explore all of the information we've put together to help guide you through your research.
      </SubHeader>
      <WIPBanner>
        <i
          className="pi pi-info-circle"
          style={{ fontSize: '1.2rem', color: '#2381FE', marginRight: '0.5rem' }}
        />
        <div>
          We are constantly adding to this knowledge base. If you have any knowledge, guide, or tool
          you'd like to see added, let us know here!
        </div>
      </WIPBanner>
      <CardRow>
        <SectionTitle>Research</SectionTitle>
        <CardContainer>
          <FirstCard
            title="Research"
            onClick={() => navigate('/knowledge_base/research')}
            style={{ borderLeft: '15px solid #27ae60' }}>
            <Title>Research</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              An umbrella term across the sciences and the humanities, research describes the
              systematic acts, on the part of researchers, taken to study overarching problems.
            </p>
          </FirstCard>
          <Arrow>{'>'}</Arrow>
          <ResearchLine />
          <CustomCard title="Paradigms" onClick={() => navigate('/knowledge_base/paradigms')}>
            <Title>Paradigms</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Paradigms provide foundational sets of beliefs and understandings about reality. This
              allows researchers to generate, test, and extend theories and practices associated
              with research into reality.
            </p>
          </CustomCard>
          <CustomCard title="Designs" onClick={() => navigate('/knowledge_base/designs')}>
            <Title>Designs</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Research designs provide foundational sets of beliefs and understandings about
              processes in research.
            </p>
          </CustomCard>
          <CustomCard title="Questions" onClick={() => navigate('/knowledge_base/questions')}>
            <Title>Questions</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Research questions provide foundational sets of beliefs and understandings about the
              role of observations in research.
            </p>
          </CustomCard>
        </CardContainer>
        <SectionTitle>Analysis</SectionTitle>
        <CardContainer>
          <FirstCard
            style={{ borderLeft: '15px solid #f1c40f' }}
            title="Analysis"
            onClick={() => navigate('/knowledge_base/analysis')}>
            <Title>Analysis</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              A word describing the study of complex information derived from research.
            </p>
          </FirstCard>
          <Arrow>{'>'}</Arrow>
          <AnalysisLine />
          <CustomCard title="Models" onClick={() => navigate('/knowledge_base/models')}>
            <Title>Models</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Models provide foundational sets of beliefs and understandings about ideas used to
              guide analyses.
            </p>
          </CustomCard>
          <CustomCard title="Samples" onClick={() => navigate('/knowledge_base/samples')}>
            <Title>Samples</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Samples provide foundational sets of beliefs and understandings about the role of
              representation for the sample statistics in relation to population parameters.
            </p>
          </CustomCard>
          <CustomCard title="Techniques" onClick={() => navigate('/knowledge_base/techniques')}>
            <Title>Techniques</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Techniques provide foundational sets of beliefs and understandings about methods used
              to conduct analyses.
            </p>
          </CustomCard>
        </CardContainer>
      </CardRow>
      <CardRow>
        <SectionTitle>Professionalism</SectionTitle>
        <CardContainer>
          <FirstCard
            style={{ borderLeft: '15px solid #e74c3c' }}
            title="Professionalism"
            onClick={() => navigate('/knowledge_base/professionalism')}>
            <Title>Professionalism</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              The conduct or qualities of researchers resulting from the development of academic
              preparation.
            </p>
          </FirstCard>
          <Arrow>{'>'}</Arrow>
          <ProfessionalismLine />
          <CustomCard title="Tables" onClick={() => navigate('/knowledge_base/tables')}>
            <Title>Tables</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Tables provide foundational sets of beliefs and understandings about data.
            </p>
          </CustomCard>
          <CustomCard title="Figures" onClick={() => navigate('/knowledge_base/figures')}>
            <Title>Figures</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Figures provide foundational sets of beliefs and understandings about the use of
              images in areas of professionalism.
            </p>
          </CustomCard>
          <CustomCard title="Labs" onClick={() => navigate('/knowledge_base/labs')}>
            <Title>Labs</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Labs provide foundational sets of beliefs and understandings about the manner in which
              inquiry drives professionalism.
            </p>
          </CustomCard>
        </CardContainer>
        <SectionTitle>Writing</SectionTitle>
        <CardContainer>
          <FirstCard
            style={{ borderLeft: '15px solid #2381fe' }}
            title="Writing"
            onClick={() => navigate('/knowledge_base/writing')}>
            <Title>Writing</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              An expression used to describe the clear, concise, and structured use of written
              language backed up with the interpretation of evidence acquired through research.
            </p>
          </FirstCard>
          <Arrow>{'>'}</Arrow>
          <WritingLine />
          <CustomCard title="Researchers" onClick={() => navigate('/knowledge_base/researchers')}>
            <Title>Researchers</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              People provide foundational sets of beliefs and understandings about the role of
              authors in writing.
            </p>
          </CustomCard>
          <CustomCard title="Key Terms" onClick={() => navigate('/knowledge_base/key_terms')}>
            <Title>Key Terms</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Key terms provide foundational sets of beliefs and understandings about concepts.
            </p>
          </CustomCard>
          <CustomCard title="Articles" onClick={() => navigate('/knowledge_base/articles')}>
            <Title>Articles</Title>
            <p className="m-0" style={{ lineHeight: '1.5' }}>
              Articles provide foundational sets of beliefs and understandings about community.
            </p>
          </CustomCard>
        </CardContainer>
      </CardRow>
    </Container>
  );
}

// <Container>
//       <PageHeader>Introduction</PageHeader>
//       <IntroductionContainer>
//         Less than 2% of the world’s current population possess their doctorate, an indicator of
//         individuals possessing both interests and skills in academic reasoning (i.e., philosophy)
//         and research. The ancient birth of these interests and skills remains a matter of
//         contention. Scholars often identify different cultural points in the history of humanity as
//         that birth, including: Western traditions of Plato’s Academy and Aristotle’s Lyceum; Middle
//         Eastern traditions of Akkadian thought found in the{' '}
//         <a href="https://www.gatewaystobabylon.com/myths/texts/classic/dialoguepessimism.htm">
//           Dialogue of Pessimism
//         </a>
//         , Egyptian beliefs in the{' '}
//         <a href="https://www.ganino.com/anteanus/the_maxims_of_ptahhotep">Maxims of Ptahtoep</a>,
//         and Zoroastrianism; Eastern traditions of Buddhism, Confucianism, and Jainism; or the lost
//         American traditions of the Aztec, Mayan, Incan, and Tupi-Guarani peoples. Regardless, many
//         of these same scholars view the advent of academic journals in 1665 (i.e.,{' '}
//         <a href="https://www.persee.fr/collection/jds">Le Journal des Savants</a> and{' '}
//         <a href="https://royalsocietypublishing.org/toc/rstl/1665/1/7">
//           Philosophical Transactions of the Royal Society
//         </a>
//         ) and the first peer reviewed journal in 1733 (i.e., Medical Essays and Observations) as
//         points of reference for the modern birth of academic reasoning and research. These points
//         likely hold value in the strength of common terms used by all interested parties around
//         which to coalesce their interests and skills. Following this perspective, the developers of
//         Quester strived to identify language common to all learners wishing to develop their own
//         interests and skills in academic reasoning and research.
//       </IntroductionContainer>
//       <FigureIdentifier>Figure 1. </FigureIdentifier>
//       <FigureName>
//         Distribution of Women and Men with a Doctoral Degree across European Countries in 2019
//       </FigureName>
//       <CustomImage src="/distributionGraph.png" width="70%" height="25%" />
//       <PageHeader>Role of Philosophy</PageHeader>
//       <RoleOfPhilosophyContainer>
//         At the center of all research lies philosophy (see Figure 2). In defining philosophy,
//         researchers identify six common branches: (a) metaphysics, (b) epistemology, (c)
//         methodology, (d) logic, (e) ethics, and (f) aesthetics. All of these branches informed the
//         development of Quester. For example, our understanding about the nature of research and
//         becoming researchers – metaphysical concerns – led us to discuss the need for an app to
//         assist individuals wishing to develop their own interests and skills in academic reasoning
//         and research. In addition, our earlier work with researchers informed our knowledge of how
//         they went about knowing truth – an epistemology question – in their content fields. Finally,
//         we needed to determine which conventions of research – philosophical methodology – most
//         effectively support the development of researchers. These considerations, and more,
//         exemplify the role of philosophy in creating Quester.
//       </RoleOfPhilosophyContainer>
//       <FigureContainer>
//         <FigureName>
//           <FigureIdentifier>Figure 2. </FigureIdentifier>Illustration of the Major Branches within
//           the Field of Philosophy
//         </FigureName>
//         <CustomImage src="/Branches of Philosophy.png" width="70%" height="25%" />
//       </FigureContainer>

//       <PageHeader>Overview</PageHeader>
//       <OverviewContainer>
//         Regardless of content field, common terms exist in the language used by individuals (e.g.,
//         PhDs) possessing interests and skills in academic reasoning and research. We identified four
//         major and thirteen minor terms. Major terms (i.e., Research, Analysis, Professionalism, and
//         Writing) describe broad activities in which people, regardless of interests and skills,
//         participate on a daily basis. For example, before making major purchases (e.g., house or
//         car), many people often spend time conducting research on the costs and benefits of making
//         those purchases. Similarly, PhDs often spend years in conducting research to establish
//         positions or generate conclusions within their respective fields. For all major terms, we
//         provide a statement defining the term, expressing the purpose of the term, and
//         contextualizing the term during research. In addition, we provide answers to several
//         questions we often hear from people as they work toward completing their respective degrees.
//         In contrast, minor terms (e.g., Paradigms, Designs, Figures, and Conceptual Models) describe
//         tools situated within the Major terms that require specialized expertise associated with
//         specific content fields. For all minor terms, we provide statements defining and expressing
//         the purpose of the term. In addition, we provide a visualization with examples of the term
//         as well as links to authoritative resources.
//       </OverviewContainer>
//     </Container>
