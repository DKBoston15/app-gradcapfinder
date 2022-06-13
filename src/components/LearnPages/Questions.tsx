import React, { useRef } from 'react';
import TableOfContents from './LearnComponents/TableOfContents/TableOfContents';
import Video from './LearnComponents/Video/Video';
import {
  Container,
  Page,
  SubHeader,
  ItemHeader,
  Paragraph,
  CustomDivider,
  NestedSection,
  CustomButton,
  ButtonContainer,
  FigureIdentifier,
  FigureName,
} from './LearnComponents/learn.styles';
import { Button } from 'primereact/button';

const video = {
  id: 1,
  name: 'Identifying Questions',
  thumbnail: 'https://img.youtube.com/vi/aRV2WnD5sxY/mqdefault.jpg',
  date: '10/24/2019',
  time: '47:51',
  url: 'https://youtu.be/aRV2WnD5sxY?t=1160',
};

export default function Questions() {
  const definition = useRef(null);
  const purpose = useRef(null);
  const examples = useRef(null);
  const exploratory = useRef(null);
  const predictive = useRef(null);
  const interpretive = useRef(null);
  const comparative = useRef(null);
  const relationship = useRef(null);
  const links = useRef(null);

  const toc = [
    {
      name: 'Definition',
      ref: definition,
    },
    {
      name: 'Purpose',
      ref: purpose,
    },
    {
      name: 'Examples',
      ref: examples,
      sections: [
        {
          name: 'Exploratory',
          ref: exploratory,
        },
        {
          name: 'Predictive',
          ref: predictive,
        },
        {
          name: 'Interpretive',
          ref: interpretive,
        },
        {
          name: 'Comparative',
          ref: comparative,
        },
        {
          name: 'Relationship',
          ref: relationship,
        },
      ],
    },
    {
      name: 'Links',
      ref: links,
    },
  ];

  return (
    <Container>
      <Page>
        <SubHeader ref={definition}>Definition</SubHeader>
        <Paragraph>
          Research questions provide the philosophical center around which researchers study a
          topic.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Questions provide structure to the process of research. This structure allows researchers
          to monitor practices and assess conclusions associated with research.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <FigureIdentifier>Figure 3 .</FigureIdentifier>
          <FigureName>
            The Onion Model Used to Describe Common Elements Associated with Research
          </FigureName>
          <img src="/research_question.png" width="80%" height="100%" />
        </Paragraph>
        <CustomDivider />
        <Video video={video} />
        <CustomDivider />
        <SubHeader ref={examples} style={{ marginTop: '2rem' }}>
          Examples of Research Questions
        </SubHeader>
        <ItemHeader ref={exploratory}>Exploratory</ItemHeader>
        <NestedSection>
          <ItemHeader>Ontology</ItemHeader>
          <NestedSection>
            <Paragraph>Research attempts to generate a new perspective on the topic</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Epistemology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Researchers use an inductive approach without a priori theorizing in conducting the
              research
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Methodology</ItemHeader>
          <NestedSection>
            <Paragraph>Focus group, Interview, Observation, Survey, Textual</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Products</ItemHeader>
          <NestedSection>
            <Paragraph>Qualitative, Mixed Method</Paragraph>
          </NestedSection>
        </NestedSection>
        <CustomDivider />
        <ItemHeader ref={predictive}>Predictive</ItemHeader>
        <NestedSection>
          <ItemHeader>Ontology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Research attempts to predict reactions to hypothetical events associated with the
              topic
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Epistemology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Researchers use both inductive and deductive approaches in responding to new data
              generated through previous research
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Methodology</ItemHeader>
          <NestedSection>
            <Paragraph>Observation, Survey</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Products</ItemHeader>
          <NestedSection>
            <Paragraph>Mixed Method, Quantitative</Paragraph>
          </NestedSection>
        </NestedSection>
        <CustomDivider />
        <ItemHeader ref={interpretive}>Interpretive</ItemHeader>
        <NestedSection>
          <ItemHeader>Ontology</ItemHeader>
          <NestedSection>
            <Paragraph>Research attempts to determine the meaning behind the topic</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Epistemology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Researchers use inductive approaches to support conclusions from research
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Methodology</ItemHeader>
          <NestedSection>
            <Paragraph>Textual</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Products</ItemHeader>
          <NestedSection>
            <Paragraph>Qualitative, Mixed Method</Paragraph>
          </NestedSection>
        </NestedSection>
        <CustomDivider />
        <ItemHeader ref={comparative}>Comparative</ItemHeader>
        <NestedSection>
          <ItemHeader>Ontology</ItemHeader>
          <NestedSection>
            <Paragraph>C variables within the topic</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Epistemology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Researchers use deductive approaches to support conclusions from research
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Methodology</ItemHeader>
          <NestedSection>
            <Paragraph>Observation, Survey</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Products</ItemHeader>
          <NestedSection>
            <Paragraph>Mixed Method, Quantitative</Paragraph>
          </NestedSection>
        </NestedSection>
        <CustomDivider />
        <ItemHeader ref={relationship}>Relationship</ItemHeader>
        <NestedSection>
          <ItemHeader>Ontology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Research attempt to clarify connections between variables within the topic
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Epistemology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Researchers use deductive approaches to support connections identified in research
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Methodology</ItemHeader>
          <NestedSection>
            <Paragraph>Observation, Survey</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Products</ItemHeader>
          <NestedSection>
            <Paragraph>Mixed Method, Quantitative</Paragraph>
          </NestedSection>
        </NestedSection>
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Questions”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying research questions through lenses we consider broadly authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aresearch_design&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/search?query=research+questions');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
