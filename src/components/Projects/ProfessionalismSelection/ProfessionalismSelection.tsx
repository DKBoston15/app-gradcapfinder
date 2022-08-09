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
import { RiTableFill, RiPieChart2Fill } from 'react-icons/ri';
import { ImLab } from 'react-icons/im';
import { TbBoxModel2 } from 'react-icons/tb';

export default function ResearchSelection() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Professionalism</Title>
      <Section>
        <SubTitle>Core Components</SubTitle>
        <CoreContainer>
          {/* <CardContainer onClick={() => navigate('/grants')}>
            <Card>
              <CardTitle>
                <Icon className="pi pi-book" />
                Grants
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque dolore saepe,
                expedita vel ullam autem!
              </CardDescription>
            </Card>
          </CardContainer> */}
          <CardContainer onClick={() => navigate('/professionalism/tables')}>
            <Card>
              <CardTitle>
                <RiTableFill style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Tables
              </CardTitle>
              <CardDescription>
                Tables provide foundational sets of beliefs and understandings about data.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/professionalism/labs')}>
            <Card>
              <CardTitle>
                <ImLab style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Labs
              </CardTitle>
              <CardDescription>
                Labs provide foundational sets of beliefs and understandings about the manner in
                which inquiry drives professionalism.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/professionalism/figures')}>
            <Card>
              <CardTitle>
                <RiPieChart2Fill style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Figures
              </CardTitle>
              <CardDescription>
                Figures provide foundational sets of beliefs and understandings about the use of
                images in areas of professionalism.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/professionalism/models')}>
            <Card>
              <CardTitle>
                <TbBoxModel2 style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                Models
              </CardTitle>
              <CardDescription>
                Models provide foundational sets of beliefs and understandings about ideas used to
                guide analyses.
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
          <CardContainer onClick={() => window.open('https://www.linkedin.com')}>
            <Card>
              <CardTitle>
                <Icon className="pi pi-linkedin" style={{ fontSize: '1.2rem', color: '#2381FE' }} />
                LinkedIn
              </CardTitle>
              <CardDescription>
                Manage your professional identity. Build and engage with your professional network.
                Access knowledge, insights and opportunities.
              </CardDescription>
            </Card>
          </CardContainer>
        </ResourcesContainer>
      </Section>
    </Container>
  );
}
