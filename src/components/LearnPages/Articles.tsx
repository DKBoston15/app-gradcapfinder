import React, { useRef } from 'react';
import TableOfContents from './LearnComponents/TableOfContents/TableOfContents';
import Video from './LearnComponents/Video/Video';
import {
  Container,
  Page,
  SubHeader,
  Paragraph,
  CustomDivider,
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

export default function Articles() {
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
          Articles identify a current state when writing to a specific community.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Articles provide foundational sets of beliefs and understandings about community. This
          allows researchers to generate, test, and extend theories and practices associated with
          writing about, or to, that community. To recognize the articles that influence your
          writing, you will need to answer a few philosophical questions. For example, responses to
          ontological (e.g., what is the nature of community?), epistemological (e.g., what can
          researchers know about community?), and methodological (e.g., how do researchers gain
          knowledge about community) questions will help you to generate your own foundational sets
          of beliefs and understandings about articles. In turn, they inform your identification of
          products you wish to generate, test, and/or extend your knowledge about your chosen
          community and writing.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 18. </FigureIdentifier>
            <FigureName>
              A conceptual framework for defining articles in terms of a community
            </FigureName>
          </div>

          <img
            src="/articles_banner.png"
            width="100%"
            height="100%"
            style={{ maxWidth: '800px' }}
          />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={examples} style={{ marginTop: '2rem' }}>
          Types and Examples
        </SubHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Article</TableHeader>
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
                <p>Opinion/editorial</p>
              </TableData>
              <TableData>Community exists and wishes to be understood.</TableData>
              <TableData>
                Researchers can generally know their community. Researchers are a part of their
                community.
              </TableData>
              <TableData>
                Participating in community related events (e.g., Conferences), connecting current
                events to current research
              </TableData>
              <TableData>Provide a voice to people outside the community</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Research</p>
              </TableData>
              <TableData>
                Individual voices form the community from individual desire to explore.
              </TableData>
              <TableData>
                Researchers know specific elements within their community. Researchers choose to
                speak to only specific elements in their community.
              </TableData>
              <TableData>Reviewing literature, creating novel knowledge</TableData>
              <TableData>Generate novel research for publication</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Review of literature</p>
              </TableData>
              <TableData>Individual voices form the community from the voices of others.</TableData>
              <TableData>
                Researchers know the cliques in their community. Researchers make value judgments
                about elements within their community.
              </TableData>
              <TableData>
                Discussing literature with novice researchers, Reading literature
              </TableData>
              <TableData>Identify leaders</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Theoretical</p>
              </TableData>
              <TableData>
                Individual voices form the community from individual desire to explain.
              </TableData>
              <TableData>
                Researchers can identify ideas important to their community. Researchers act as
                leaders in their community.
              </TableData>
              <TableData>Discussing literature with researchers, reviewing literature</TableData>
              <TableData>Push the community in a specific direction</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Articles”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying academic journals through lenses we consider broadly authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aacademic_writing&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/search?query=academic+literature');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
