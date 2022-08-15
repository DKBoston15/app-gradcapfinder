import React, { useRef } from 'react';
import TableOfContents from './LearnComponents/TableOfContents/TableOfContents';
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

export default function Labs() {
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
          Labs classify perspectives of professionalism in research by differentiating inquiry.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Labs provide foundational sets of beliefs and understandings about the manner in which
          inquiry drives professionalism. This allows researchers to generate, test, and extend
          theories and practices associated with the value of inquiry as a professional researcher.
          To recognize the labs that influence your professionalism, you will need to answer a few
          philosophical questions. For example, responses to ontological (e.g., what is the nature
          of inquiry?), epistemological (e.g., what can researchers know about inquiry?), and
          methodological (e.g., how do researchers gain knowledge about inquiry) questions will help
          you to generate your own foundational sets of beliefs and understandings of how inquiry
          influences your status within labs. In turn, they inform your identification of products
          you wish to generate, test, and/or extend through your role as a professional researcher.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 15. </FigureIdentifier>
            <FigureName>A conceptual framework for defining labs in terms of inquiry</FigureName>
          </div>
          <img src="/labs_banner.png" width="100%" height="100%" style={{ maxWidth: '800px' }} />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={examples} style={{ marginTop: '2rem' }}>
          Types and Examples
        </SubHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Lab</TableHeader>
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
              <TableHeader>Product</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableData>
                <p>Analytical</p>
              </TableData>
              <TableData>
                Inquiry is rooted in both reality and theory using measures to model natural reality
                and theory.
              </TableData>
              <TableData>
                Researchers can know novel procedures. Researchers are removed from the nature of
                the inquiry.
              </TableData>
              <TableData>Manuals, practice, collegial discussion</TableData>
              <TableData>Publishing articles, conducting lectures, patents</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Clinical</p>
              </TableData>
              <TableData>
                Inquiry is rooted in both reality and theory in modeling psychological reality and
                theory.
              </TableData>
              <TableData>
                Researchers can know novel procedures. Researchers may or may not be a part of the
                nature associated with inquiry.
              </TableData>
              <TableData>Observation, manuals, practice, collegial discussion</TableData>
              <TableData>
                Publishing articles/books, conducting lectures, engaging in clinical work
              </TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Production</p>
              </TableData>
              <TableData>Inquiry is rooted in reality to generate materials in reality.</TableData>
              <TableData>
                Researchers can know standardized procedures. Researchers are removed from the
                process of inquiry.
              </TableData>
              <TableData>Manuals</TableData>
              <TableData>Consistency of outcomes</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>R&D</p>
              </TableData>
              <TableData>
                Inquiry is rooted in reality to generate materials for a future reality.
              </TableData>
              <TableData>
                Researchers can know both standardized and novel procedures. Researchers may or may
                not be a part of inquiry.
              </TableData>
              <TableData>Observation, manuals, practice</TableData>
              <TableData>Novel outcomes</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Labs”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying academic rationalism through lenses we consider broadly authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Alaboratory&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Sage"
            onClick={() => {
              window.open('https://us.sagepub.com/en-us/nam/product/laboratory');
            }}
            className="p-button-primary p-button-sm"
          />
          <Button
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/searcher.py?query=laboratory');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
