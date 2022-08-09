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
import { FaPuzzlePiece, FaBrain } from 'react-icons/fa';

export default function ResearchSelection() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Analysis</Title>
      <Section>
        <SubTitle>Core Components</SubTitle>
        <CoreContainer>
          <CardContainer onClick={() => navigate('/analysis/samples')}>
            <Card>
              <CardTitle>
                <FaPuzzlePiece style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Samples
              </CardTitle>
              <CardDescription>
                Samples provide foundational sets of beliefs and understandings about the role of
                representation for the sample statistics in relation to population parameters.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/analysis/analysis_techniques')}>
            <Card>
              <CardTitle>
                <FaBrain style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Techniques
              </CardTitle>
              <CardDescription>
                Techniques provide foundational sets of beliefs and understandings about methods
                used to conduct analyses.
              </CardDescription>
            </Card>
          </CardContainer>
        </CoreContainer>
        <SubTitle>Resources</SubTitle>
        <ResourcesContainer>
          <CardContainer onClick={() => navigate('/knowledge_base/professionalism')}>
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
        </ResourcesContainer>
      </Section>
    </Container>
  );
}
