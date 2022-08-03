import React, { useRef } from 'react';
import TableOfContents from './LearnComponents/TableOfContents/TableOfContents';
import {
  Container,
  Page,
  SubHeader,
  Paragraph,
  CustomDivider,
  FigureIdentifier,
  FigureName,
  List,
  ListItem,
  Question,
} from './LearnComponents/learn.styles';

export default function Analysis() {
  const analysis = useRef(null);
  const conceptualModel = useRef(null);
  const faq = useRef(null);

  const toc = [
    {
      name: 'Analysis',
      ref: analysis,
    },
    {
      name: 'Conceptual Model',
      ref: conceptualModel,
    },
    {
      name: 'FAQ',
      ref: faq,
    },
  ];

  return (
    <Container>
      <Page>
        <SubHeader ref={analysis}>Analysis</SubHeader>
        <Paragraph>
          A word describing the study of complex information derived from research (see Figure 2).
          The purpose of analysis centers on the desire of researchers to understand elements of an
          overarching problem and reach conclusions about more specific questions. Through the use
          of specific methods of analysis, researchers answer more specific questions associated
          with overarching problems.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={conceptualModel}>Conceptual Model</SubHeader>
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 8. </FigureIdentifier>
            <FigureName>Common Visualization Products Generated from Analysis</FigureName>
          </div>
          <img
            src="/analysis_banner.jpg"
            width="100%"
            height="100%"
            style={{ maxWidth: '400px' }}
          />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={faq}>FAQ</SubHeader>
        <div>
          <Question>What are some common types of analysis?</Question>
          <List>
            <ListItem>Descriptive</ListItem>
            <ListItem>Exploratory</ListItem>
            <ListItem>Inferential</ListItem>
            <ListItem>Mechanistic</ListItem>
            <ListItem>Predictive</ListItem>
          </List>
          <Question>What are some common methods used in analysis?</Question>
          <List>
            <ListItem>Cluster</ListItem>
            <ListItem>Factor</ListItem>
            <ListItem>Grounded</ListItem>
            <ListItem>Narrative</ListItem>
            <ListItem>Phenomenological</ListItem>
            <ListItem>SEM</ListItem>
            <ListItem>Textual</ListItem>
          </List>
          <Question>What are some common elements of analysis?</Question>
          <List>
            <ListItem>Asserting a point of view</ListItem>
            <ListItem>Collecting evidence to support a point of view</ListItem>
            <ListItem>Justifying the point of view through the manipulation of evidence</ListItem>
            <ListItem>
              Discussing the value of a point of view from the manipulation of evidence
            </ListItem>
          </List>
        </div>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
