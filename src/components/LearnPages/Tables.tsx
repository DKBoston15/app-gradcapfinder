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

export default function Tables() {
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
          Tables combine elements of research through professionalism for ensuring the proper
          expression of data.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Tables provide foundational sets of beliefs and understandings about data. This allows
          researchers to generate, test, and extend theories and practices associated with research
          into how data reflects professional standards. To recognize the data that influences your
          professionalism, you will need to answer a few philosophical questions. For example,
          responses to ontological (e.g., what is the nature of data?), epistemological (e.g., what
          can researchers know about data?), and methodological (e.g., how do researchers gain
          knowledge about data) questions will help you to generate your own foundational sets of
          beliefs and understandings about the role of data. In turn, they inform your
          identification of products you wish to generate, test, and/or extend through your
          professional behaviors.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 13. </FigureIdentifier>
            <FigureName>A conceptual framework for defining tables in terms of data</FigureName>
          </div>
          <img src="/tables_banner.png" width="100%" height="100%" style={{ maxWidth: '800px' }} />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={examples} style={{ marginTop: '2rem' }}>
          Types and Examples
        </SubHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Table</TableHeader>
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
                <p>Qualitative</p>
              </TableData>
              <TableData>Data exists in multiple forms and can be manipulated.</TableData>
              <TableData>
                Researchers can experience data. Researchers act as data gatherers.
              </TableData>
              <TableData>Frequencies, qualitative methods</TableData>
              <TableData>Descriptions, patterns</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Numeric descriptive</p>
              </TableData>
              <TableData>Data exists to quantify a single quality.</TableData>
              <TableData>
                Researchers can identify data. Researchers are distinct from data.
              </TableData>
              <TableData>Distributions</TableData>
              <TableData>Measures of center, spread, and shape</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Numeric associative</p>
              </TableData>
              <TableData>
                Data exists to quantify an interaction between two or more qualities.
              </TableData>
              <TableData>
                Researchers can identify relationships between data. Researchers are distinct from
                relationships between data.
              </TableData>
              <TableData>Variance matrices</TableData>
              <TableData>Pearson’s r, Spearman’s rho, Chi-square</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Numeric inferential</p>
              </TableData>
              <TableData>
                Data exists to simultaneously quantify the complexity of multiple qualities and
                interactions.
              </TableData>
              <TableData>
                Researchers can establish and estimate the complexity of relationships between data.
                Researchers are distinct from the complexity in relationships between data.
              </TableData>
              <TableData>Variance matrices, empirical models</TableData>
              <TableData>SEM, Null hypothesis testing</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Tables”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying the use of academic empiricism through lenses we consider broadly
          authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Adata_visualization&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/search?query=data+visualization');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
