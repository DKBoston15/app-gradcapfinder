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
import { FaPuzzlePiece, FaBrain } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import { TbBoxModel2 } from 'react-icons/tb';
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
        defaultSection={{ name: 'Analysis' }}
      />
      <Title>Analysis</Title>
      <Section>
        <SubTitle>Core Components</SubTitle>
        <CoreContainer>
          <CardContainer onClick={() => navigate('/analysis/models')}>
            <Card>
              <CardTitle>
                <TbBoxModel2 style={{ fontSize: '1.2rem', color: '#f1c40f' }} />
                Models
              </CardTitle>
              <CardDescription>
                Models provide foundational sets of beliefs and understandings about ideas used to
                guide analyses.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/analysis/samples')}>
            <Card>
              <CardTitle>
                <FaPuzzlePiece style={{ fontSize: '1.2rem', color: '#f1c40f' }} />
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
                <FaBrain style={{ fontSize: '1.2rem', color: '#f1c40f' }} />
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
          <CardContainer onClick={() => navigate('/knowledge_base/analysis')}>
            <Card>
              <CardTitle>
                <Icon className="pi pi-book" style={{ fontSize: '1.2rem', color: '#f1c40f' }} />
                Learn More
              </CardTitle>
              <CardDescription>
                Learn more about each of these elements in our documentation.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => window.open('https://statistics.laerd.com/')}>
            <Card>
              <CardTitle>
                <img src="/laerd_logo.png" style={{ width: '4rem' }} />
              </CardTitle>
              <CardDescription>
                This website provides novice and intermediate level information on the use of
                analytic methods involving the use of statistics. The free level offers general
                information whereas the pay section provides greater explanations for the use of
                different analytic methods.
              </CardDescription>
            </Card>
          </CardContainer>
          {resources.map((resource: any) => {
            if (JSON.parse(resource.section).name === 'Analysis') {
              return (
                <>
                  <EditResourceDialog
                    displayPrompt={editDisplayPrompt}
                    setDisplayPrompt={setEditDisplayPrompt}
                    defaultSection={{ name: 'Analysis' }}
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
                <AiFillPlusCircle style={{ fontSize: '2rem', color: '#f1c40f' }} />
              </CustomCardDescription>
            </Card>
          </CardContainer>
        </ResourcesContainer>
      </Section>
    </Container>
  );
}
