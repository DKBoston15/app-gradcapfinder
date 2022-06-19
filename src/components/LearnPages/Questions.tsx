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
  Table,
  TableHead,
  TableRow,
  TableData,
  TableHeader,
  TableBody,
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
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Research Paradigm</TableHeader>
              <TableHeader>
                <a href="https://plato.stanford.edu/entries/logic-ontology/#Ont" target="_blank">
                  Ontology
                </a>
              </TableHeader>
              <TableHeader>
                <a href="https://plato.stanford.edu/entries/epistemology/" target="_blank">
                  Epistemology
                </a>
              </TableHeader>
              <TableHeader>
                <a href="https://plato.stanford.edu/entries/scientific-method/" target="_blank">
                  Methodology
                </a>
              </TableHeader>
              <TableHeader>Products</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableData>
                <a
                  href="https://www.sciencedirect.com/topics/computer-science/exploratory-question"
                  target="_blank">
                  Exploratory
                </a>
              </TableData>
              <TableData>Research attempts to generate a new perspective on the topic</TableData>
              <TableData>
                Researchers use an inductive approach without a prior theorizing in conducting the
                research
              </TableData>
              <TableData>Focus group, Interview, Observation, Survey, Textual</TableData>
              <TableData>Qualitative, Mixed Method</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <a href="https://plato.stanford.edu/entries/science-big-data/" target="_blank">
                  Predictive
                </a>
              </TableData>
              <TableData>
                Research attempts to predict reactions to hypothetical events associated with the
                topic
              </TableData>
              <TableData>
                Researchers use both inductive and deductive approaches in responding to new data
                generated through previous research
              </TableData>
              <TableData>Observation, Survey</TableData>
              <TableData>Mixed Method, Quantitative</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <a
                  href="https://www.cairn.info/revue-internationale-de-psychosociologie-2009-35-page-29.htm"
                  target="_blank">
                  Interpretive
                </a>
              </TableData>
              <TableData>Research attempts to determine the meaning behind the topic</TableData>
              <TableData>
                Researchers use inductive approaches to support conclusions from research
              </TableData>
              <TableData>Textual</TableData>
              <TableData>Qualitative, Mixed Method</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <a
                  href="https://www.oxfordbibliographies.com/view/document/obo-9780199756384/obo-9780199756384-0188.xml?rskey=ZP3p2E&result=1&q=qualitative+comparative+analysis#firstMatch"
                  target="_blank">
                  Comparative
                </a>
              </TableData>
              <TableData>
                Research attempts to identify significant variables within the topic
              </TableData>
              <TableData>
                Researchers use deductive approaches to support conclusions from research
              </TableData>
              <TableData>Observation, Survey</TableData>
              <TableData>Mixed Method, Quantitative</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <a href="https://plato.stanford.edu/entries/causal-models/" target="_blank">
                  Relationship
                </a>
              </TableData>
              <TableData>
                Research attempts to clarify connections between variables within the topic
              </TableData>
              <TableData>
                RResearchers use deductive approaches to support connections identified in research
              </TableData>
              <TableData>Observation, Survey</TableData>
              <TableData>Mixed Method, Quantitative</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
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
