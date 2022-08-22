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
import { RiTableFill, RiPieChart2Fill } from 'react-icons/ri';
import { ImLab } from 'react-icons/im';
import { TbBoxModel2 } from 'react-icons/tb';
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
        defaultSection={{ name: 'Professionalism' }}
      />
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
                <RiTableFill style={{ fontSize: '1.2rem', color: '#e74c3c' }} />
                Tables
              </CardTitle>
              <CardDescription>
                Tables provide foundational sets of beliefs and understandings about data.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/professionalism/figures')}>
            <Card>
              <CardTitle>
                <RiPieChart2Fill style={{ fontSize: '1.2rem', color: '#e74c3c' }} />
                Figures
              </CardTitle>
              <CardDescription>
                Figures provide foundational sets of beliefs and understandings about the use of
                images in areas of professionalism.
              </CardDescription>
            </Card>
          </CardContainer>
          <CardContainer onClick={() => navigate('/professionalism/labs')}>
            <Card>
              <CardTitle>
                <ImLab style={{ fontSize: '1.2rem', color: '#e74c3c' }} />
                Labs
              </CardTitle>
              <CardDescription>
                Labs provide foundational sets of beliefs and understandings about the manner in
                which inquiry drives professionalism.
              </CardDescription>
            </Card>
          </CardContainer>
        </CoreContainer>
        <SubTitle>Resources</SubTitle>
        <ResourcesContainer>
          <CardContainer onClick={() => navigate('/knowledge_base/professionalism')}>
            <Card>
              <CardTitle>
                <Icon className="pi pi-book" style={{ fontSize: '1.2rem', color: '#e74c3c' }} />
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
                <Icon className="pi pi-linkedin" style={{ fontSize: '1.2rem', color: '#e74c3c' }} />
                LinkedIn
              </CardTitle>
              <CardDescription>
                Manage your professional identity. Build and engage with your professional network.
                Access knowledge, insights and opportunities.
              </CardDescription>
            </Card>
          </CardContainer>
          {resources.map((resource: any) => {
            if (JSON.parse(resource.section).name === 'Professionalism') {
              return (
                <>
                  <EditResourceDialog
                    displayPrompt={editDisplayPrompt}
                    setDisplayPrompt={setEditDisplayPrompt}
                    defaultSection={{ name: 'Professionalism' }}
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
                <AiFillPlusCircle style={{ fontSize: '2rem', color: '#e74c3c' }} />
              </CustomCardDescription>
            </Card>
          </CardContainer>
        </ResourcesContainer>
      </Section>
    </Container>
  );
}
