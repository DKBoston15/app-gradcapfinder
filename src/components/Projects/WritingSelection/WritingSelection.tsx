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
  ActionContainer,
  DeleteContainer,
} from './styles';
import { BsFillPeopleFill, BsKeyFill, BsJournalBookmarkFill } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';
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
        defaultSection={{ name: 'Writing' }}
      />
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
          <CardContainer onClick={() => navigate('/knowledge_base/writing')}>
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
          {resources.map((resource: any) => {
            if (JSON.parse(resource.section).name === 'Writing') {
              return (
                <>
                  <EditResourceDialog
                    displayPrompt={editDisplayPrompt}
                    setDisplayPrompt={setEditDisplayPrompt}
                    defaultSection={{ name: 'Writing' }}
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
                <AiFillPlusCircle style={{ fontSize: '2rem', color: '#2381FE' }} />
              </CustomCardDescription>
            </Card>
          </CardContainer>
        </ResourcesContainer>
      </Section>
    </Container>
  );
}
