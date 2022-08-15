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

export default function Professionalism() {
  const professionalism = useRef(null);
  const conceptualModel = useRef(null);
  const faq = useRef(null);

  const toc = [
    {
      name: 'Professionalism',
      ref: professionalism,
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
        <SubHeader ref={professionalism}>Professionalism</SubHeader>
        <Paragraph>
          The conduct or qualities of researchers resulting from the development of academic
          preparation (see Figure 3). Professionalism supports positive first impressions,
          successful relationships, and valid reputations for researchers within academic
          environments. Through professionalism, researchers maintain high ethical standards in
          research, instruction, and service.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={conceptualModel}>Conceptual Model</SubHeader>
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 12. </FigureIdentifier>
            <FigureName>
              Contextualized Perspective of Tacit and Overt Aspects of Professionalism
            </FigureName>
          </div>
          <img
            src="/professionalism_banner.jpg"
            width="100%"
            height="100%"
            style={{ maxWidth: '600px' }}
          />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={faq}>FAQ</SubHeader>
        <div>
          <Question>What are some common perceptions of professionalism?</Question>
          <List>
            <ListItem>Communicative</ListItem>
            <ListItem>Competent</ListItem>
            <ListItem>Honest</ListItem>
            <ListItem>Team player</ListItem>
            <ListItem>Trustworthiness</ListItem>
          </List>
          <Question>What are some common activities associated with professionalism?</Question>
          <List>
            <ListItem>Generate effective, consistent, and reliable work habits</ListItem>
            <ListItem>Manage time</ListItem>
            <ListItem>Provide excellence in work product</ListItem>
            <ListItem>Solve problems</ListItem>
            <ListItem>Take initiative</ListItem>
          </List>
          <Question>What are some common elements of professionalism?</Question>
          <List>
            <ListItem>Possessing specialized knowledge</ListItem>
            <ListItem>Exhibiting competency</ListItem>
            <ListItem>Behaving with honesty and integrity</ListItem>
            <ListItem>Monitoring actions through self-regulation</ListItem>
            <ListItem>Generating a system of accountability</ListItem>
          </List>
        </div>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
