import React, { useState } from 'react';
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
  CustomCardDescription,
  EditContainer,
  DeleteContainer,
  ActionContainer,
} from './styles';
import { RiArticleLine, RiFlowChart, RiQuestionLine } from 'react-icons/ri';
import { AiOutlineAntDesign, AiFillPlusCircle } from 'react-icons/ai';
import { SiGooglescholar } from 'react-icons/si';
import AddResourceDialog from '../AddResourceDialog/AddResourceDialog';
import { useResourceStore } from '@app/stores/resourceStore';
import EditResourceDialog from '../EditResourceDialog/EditResourceDialog';

export default function ResearchSelection() {
  const navigate = useNavigate();
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [editDisplayPrompt, setEditDisplayPrompt] = useState(false);
  const { resources, deleteResource } = useResourceStore((state) => ({
    resources: state.resources,
    deleteResource: state.deleteResource,
  }));

  return (
    <Container>
      <AddResourceDialog
        displayPrompt={displayPrompt}
        setDisplayPrompt={setDisplayPrompt}
        defaultSection={{ name: 'Research' }}
      />
      <Title>Research</Title>
      <Section>
        <SubTitle>Core Components</SubTitle>
        <CoreContainer>
          <CardContainer onClick={() => navigate('/research/research_paradigms')}>
            <Card>
              <CardTitle>
                <RiFlowChart style={{ fontSize: '1.2rem', color: '#27ae60' }} />
                Paradigms
              </CardTitle>
              <CardDescription>
                Paradigms provide foundational sets of beliefs and understandings about reality.
                This allows researchers to generate, test, and extend theories and practices
                associated with research into reality.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/research/analytic_designs')}>
            <Card>
              <CardTitle>
                <AiOutlineAntDesign style={{ fontSize: '1.2rem', color: '#27ae60' }} />
                Designs
              </CardTitle>
              <CardDescription>
                Research designs provide foundational sets of beliefs and understandings about
                processes in research.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/research/research_questions')}>
            <Card>
              <CardTitle>
                <RiQuestionLine style={{ fontSize: '1.2rem', color: '#27ae60' }} />
                Questions
              </CardTitle>
              <CardDescription>
                Research questions provide foundational sets of beliefs and understandings about the
                role of observations in research.
              </CardDescription>
            </Card>
          </CardContainer>
        </CoreContainer>
        <SubTitle>Resources</SubTitle>
        <ResourcesContainer>
          <CardContainer onClick={() => navigate('/knowledge_base/research')}>
            <Card>
              <CardTitle>
                <Icon className="pi pi-book" style={{ fontSize: '1.2rem', color: '#27ae60' }} />
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
                <SiGooglescholar style={{ fontSize: '1.2rem', color: '#27ae60' }} />
                Google Scholar
              </CardTitle>
              <CardDescription>
                Google Scholar provides a simple way to broadly search for scholarly literature.
              </CardDescription>
            </Card>
          </CardContainer>
          {resources.map((resource: any) => {
            if (JSON.parse(resource.section).name === 'Research') {
              return (
                <>
                  <EditResourceDialog
                    displayPrompt={editDisplayPrompt}
                    setDisplayPrompt={setEditDisplayPrompt}
                    defaultSection={{ name: 'Research' }}
                    resourceId={resource.id}
                    passedTitle={resource.title}
                    passedDescription={resource.description}
                    passedLink={resource.link}
                  />
                  <CardContainer>
                    <Card onClick={() => window.open(resource.link)}>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </Card>
                    <ActionContainer>
                      <EditContainer
                        onClick={() => {
                          setEditDisplayPrompt(true);
                        }}>
                        Edit
                      </EditContainer>
                      <DeleteContainer
                        onClick={() => {
                          deleteResource(resource.id);
                        }}>
                        Delete
                      </DeleteContainer>
                    </ActionContainer>
                  </CardContainer>
                </>
              );
            }
          })}
          <CardContainer onClick={() => setDisplayPrompt(true)}>
            <Card>
              <CustomCardDescription>
                <div style={{ fontSize: '1.3rem', paddingBottom: '1rem' }}>Add Resource</div>
                <AiFillPlusCircle style={{ fontSize: '2rem', color: '#27ae60' }} />
              </CustomCardDescription>
            </Card>
          </CardContainer>
        </ResourcesContainer>
      </Section>
    </Container>
  );
}
