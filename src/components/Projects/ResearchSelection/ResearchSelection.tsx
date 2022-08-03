import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Section,
  Title,
  CardContainer,
  Card,
  SubTitle,
  CoreContainer,
  CardTitle,
  CardDescription,
  Icon,
  ResourcesContainer,
} from './styles';
import { RiArticleLine, RiFlowChart, RiQuestionLine } from 'react-icons/ri';
import { AiOutlineAntDesign } from 'react-icons/ai';
import { SiGooglescholar } from 'react-icons/si';

export default function ResearchSelection() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Research</Title>
      <Section>
        <SubTitle>Core Components</SubTitle>
        <CoreContainer>
          <CardContainer onClick={() => navigate('/articles')}>
            <Card>
              <CardTitle>
                <RiArticleLine style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Articles
              </CardTitle>
              <CardDescription>
                Articles provide foundational sets of beliefs and understandings about community.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/research_paradigms')}>
            <Card>
              <CardTitle>
                <RiFlowChart style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Paradigms
              </CardTitle>
              <CardDescription>
                Paradigms provide foundational sets of beliefs and understandings about reality.
                This allows researchers to generate, test, and extend theories and practices
                associated with research into reality.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/research_questions')}>
            <Card>
              <CardTitle>
                <RiQuestionLine style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Questions
              </CardTitle>
              <CardDescription>
                Research questions provide foundational sets of beliefs and understandings about the
                role of observations in research.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/analytic_designs')}>
            <Card>
              <CardTitle>
                <AiOutlineAntDesign style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Designs
              </CardTitle>
              <CardDescription>
                Research designs provide foundational sets of beliefs and understandings about
                processes in research.
              </CardDescription>
            </Card>
          </CardContainer>
        </CoreContainer>
        <SubTitle>Resources</SubTitle>
        <ResourcesContainer>
          <CardContainer onClick={() => navigate('/knowledge_base/research')}>
            <Card>
              <CardTitle>
                <Icon className="pi pi-book" style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Learn More
              </CardTitle>
              <CardDescription>
                Learn more about each of these elements in our documentation.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => window.open('https://scholar.google.com/')}>
            <Card>
              <CardTitle>
                <SiGooglescholar style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Google Scholar
              </CardTitle>
              <CardDescription>
                Google Scholar provides a simple way to broadly search for scholarly literature.
              </CardDescription>
            </Card>
          </CardContainer>
        </ResourcesContainer>
      </Section>
    </Container>
  );
}
