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

export default function KeyTerms() {
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
          Key terms clarify the act of writing by consolidating larger concepts.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Key terms provide foundational sets of beliefs and understandings about concepts. This
          allows researchers to generate, test, and extend theories and practices associated with
          writing about those concepts. To recognize the key terms that influences your writing, you
          will need to answer a few philosophical questions. For example, responses to ontological
          (e.g., what is the nature of a concept?), epistemological (e.g., what can researchers know
          about a concept?), and methodological (e.g., how do researchers gain knowledge about a
          concept) questions will help you to generate your own foundational sets of beliefs and
          understandings the importance of key terms. In turn, they inform your identification of
          products you wish to generate, test, and/or extend yourself in writing.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 17. </FigureIdentifier>
            <FigureName>
              A conceptual framework for defining key terms in terms of a concept
            </FigureName>
          </div>

          <img
            src="/key_terms_banner.png"
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
              <TableHeader>Key Term</TableHeader>
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
              <TableHeader>Philosophical Center</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableData>
                <p>Generic</p>
              </TableData>
              <TableData>
                Concepts exist as broad points inside and outside a field of research.
              </TableData>
              <TableData>
                Researchers can easily know concepts. Researchers use concepts in general
                communication.
              </TableData>
              <TableData>Observation, study, discussion</TableData>
              <TableData>Writing opinion and review of literature articles</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Methodological</p>
              </TableData>
              <TableData>
                Concepts exist as points related to specific activities in research.
              </TableData>
              <TableData>
                Researchers can know concepts after intensive development. Researchers physically
                manifest concepts.
              </TableData>
              <TableData>Testing</TableData>
              <TableData>Creating instruments, prototypes, and schematics.</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Model specific</p>
              </TableData>
              <TableData>
                Concepts exist as points related to specific ideas guiding current or past research.
              </TableData>
              <TableData>
                Researcher know concepts. Researchers attempt to understand concepts.
              </TableData>
              <TableData>Cross sectional and longitudinal testing</TableData>
              <TableData>Writing research articles.</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Novel</p>
              </TableData>
              <TableData>
                Concepts exist as points related to specific ideas guiding current research.
              </TableData>
              <TableData>
                Researcher know concepts. Researchers act as interpreters for concepts.
              </TableData>
              <TableData>Longitudinal testing</TableData>
              <TableData>Writing research articles.</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Key terms”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying academic jargon through lenses we consider broadly authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aterminology&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/search?query=key+terms');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
