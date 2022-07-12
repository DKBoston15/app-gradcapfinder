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

export default function Writing() {
  const writing = useRef(null);
  const conceptualModel = useRef(null);
  const faq = useRef(null);

  const toc = [
    {
      name: 'Writing',
      ref: writing,
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
        <SubHeader ref={writing}>Writing</SubHeader>
        <Paragraph>
          An umbrella term across the sciences and the humanities, research describes the systematic
          acts, on the part of researchers, taken to study overarching problems (see Figure 1). The
          purpose of research reflects the philosophical positions (i.e., paradigms) of those
          researchers. Through the course of research, researchers use paradigms to answer more
          specific questions associated with overarching problems.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={conceptualModel}>Conceptual Model</SubHeader>
        <Paragraph>
          <FigureIdentifier>Figure 1 .</FigureIdentifier>
          <FigureName>
            The Onion Model Used to Describe Common Elements Associated with Research
          </FigureName>
          <img src="/research_image.jpg" width="80%" height="100%" />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={faq}>FAQ</SubHeader>
        <div>
          <Question>What are some common types of research?</Question>
          <List>
            <ListItem>Causal</ListItem>
            <ListItem>Derived</ListItem>
            <ListItem>Experimental</ListItem>
            <ListItem>Observational</ListItem>
            <ListItem>Simulated</ListItem>
          </List>
          <Question>What are some common methods used in research?</Question>
          <List>
            <ListItem>Experimental</ListItem>
            <ListItem>Participant observation</ListItem>
            <ListItem>Secondary</ListItem>
            <ListItem>Survey</ListItem>
            <ListItem>Textual</ListItem>
          </List>
          <Question>What are some common elements of research?</Question>
          <List>
            <ListItem>Identifying overarching problems and developing research questions</ListItem>
            <ListItem>Creating an informative literature review</ListItem>
            <ListItem>
              Designing a method for the collection, archiving, and analysis of data
            </ListItem>
            <ListItem>Completing analysis of data</ListItem>
            <ListItem>Interpreting results from analysis of data</ListItem>
            <ListItem>Linking results to overarching problem and research questions</ListItem>
            <ListItem>
              Identifying strengths and limitations, as well as, future directions for research
            </ListItem>
          </List>
        </div>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
