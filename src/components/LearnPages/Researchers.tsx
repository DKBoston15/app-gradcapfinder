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

export default function Researchers() {
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
          Researchers act as agents of writing by generating disparate types of authors.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Researchers provide foundational sets of beliefs and understandings about the role of
          authors in writing. This allows researchers to generate, test, and extend theories and
          practices associated with understanding the value of writing through the nature of
          authors. To recognize the researchers that influence your writing, you will need to answer
          a few philosophical questions. For example, responses to ontological (e.g., what is the
          nature of authors?), epistemological (e.g., what can researchers know about authors?), and
          methodological (e.g., how do researchers gain knowledge about authors) questions will help
          you to generate your own foundational sets of beliefs and understandings about how to
          become a researcher. In turn, they inform your identification of products you wish to
          generate, test, and/or extend as you develop your skills in writing.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 16. </FigureIdentifier>
            <FigureName>
              A conceptual framework for defining researchers in terms of authors
            </FigureName>
          </div>
          <img
            src="/researchers_banner.png"
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
              <TableHeader>Researcher</TableHeader>
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
                <p>Novice</p>
              </TableData>
              <TableData>Authors exhibit and possess fundamental knowledge and skills.</TableData>
              <TableData>
                Researchers can know authors. Researchers know authors in terms of what authors lack
                in knowledge and skills.
              </TableData>
              <TableData>Direct observation of behaviors</TableData>
              <TableData>Text</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Intermediate</p>
              </TableData>
              <TableData>Authors exhibit and possess knowledge and skills.</TableData>
              <TableData>
                Researchers can know authors. Researchers know authors in terms of how authors
                develop themselves professionally.
              </TableData>
              <TableData>Published articles</TableData>
              <TableData>Anecdotal stories, text</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Expert</p>
              </TableData>
              <TableData>
                Authors generate novel knowledge and skills while leading others.
              </TableData>
              <TableData>
                Researchers can know authors. Researchers know authors through patterns of
                leadership.
              </TableData>
              <TableData>Articles, direct observation, and leadership</TableData>
              <TableData>Anecdotal stories</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Authors”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying academic scholarship through lenses we consider broadly authoritative.
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
              window.open('https://plato.stanford.edu/search/search?query=academic+writing');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
