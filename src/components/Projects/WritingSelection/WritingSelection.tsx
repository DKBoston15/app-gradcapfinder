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
import { BsFillPeopleFill, BsKeyFill, BsJournalBookmarkFill } from 'react-icons/bs';

export default function ResearchSelection() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Writing</Title>
      <Section>
        <SubTitle>Core Components</SubTitle>
        <CoreContainer>
          <CardContainer onClick={() => navigate('/writing/people')}>
            <Card>
              <CardTitle>
                <BsFillPeopleFill style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                People
              </CardTitle>
              <CardDescription>
                People provide foundational sets of beliefs and understandings about the role of
                authors in writing.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/writing/key_terms')}>
            <Card>
              <CardTitle>
                <BsKeyFill style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Key Terms
              </CardTitle>
              <CardDescription>
                Key terms provide foundational sets of beliefs and understandings about concepts.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/writing/journals')}>
            <Card>
              <CardTitle>
                <BsJournalBookmarkFill style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Journals
              </CardTitle>
              <CardDescription>
                Articles provide foundational sets of beliefs and understandings about community.
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
