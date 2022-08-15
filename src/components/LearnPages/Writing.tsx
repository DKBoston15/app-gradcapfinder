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
          An expression used to describe the clear, concise, and structured use of written language
          backed up with the interpretation of evidence acquired through research (see Figure 4).
          Writing allows researchers to convey their understanding of complex ideas to readers.
          Although possessing a formal tone and style, researchers do not use complex sentences or
          complicated vocabulary in writing as both actions reduce clarity of understanding for
          readers.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={conceptualModel}>Conceptual Model</SubHeader>
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 4. </FigureIdentifier>
            <FigureName>Common Visualization Products Generated from Analysis</FigureName>
          </div>
          <img src="/writing_banner.jpg" width="100%" height="100%" style={{ maxWidth: '400px' }} />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={faq}>FAQ</SubHeader>
        <div>
          <Question>What are some common types of writing?</Question>
          <List>
            <ListItem>Comparative/Contrasting</ListItem>
            <ListItem>Expository</ListItem>
            <ListItem>Narrative</ListItem>
            <ListItem>Persuasive</ListItem>
            <ListItem>Reflective</ListItem>
          </List>
          <Question>What are some common methods used in writing?</Question>
          <List>
            <ListItem>Alliteration and assonance</ListItem>
            <ListItem>Foreshadowing</ListItem>
            <ListItem>Hyperbole</ListItem>
            <ListItem>Metaphor</ListItem>
            <ListItem>Personification</ListItem>
            <ListItem>Phenomenological</ListItem>
            <ListItem>Technical</ListItem>
          </List>
          <Question>What are some common elements of writing?</Question>
          <List>
            <ListItem>Introducing the purpose</ListItem>
            <ListItem>Identifying the audience</ListItem>
            <ListItem>Providing clarity</ListItem>
            <ListItem>Understanding construction</ListItem>
          </List>
        </div>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
