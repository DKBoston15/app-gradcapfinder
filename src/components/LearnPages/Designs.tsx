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

export default function Designs() {
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
          Research designs structure the use of specific processes in conducting research.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Research designs provide foundational sets of beliefs and understandings about processes
          in research. This allows researchers to generate, test, and extend theories and practices
          associated with processes used in their own research. To recognize the designs that
          influences your research, you will need to answer a few philosophical questions. For
          example, responses to ontological (e.g., what is the nature of processes?),
          epistemological (e.g., what can researchers know about processes?), and methodological
          (e.g., how do researchers gain knowledge about processes) questions will help you to
          generate your own foundational sets of beliefs and understandings about research designs.
          In turn, they inform your identification of products you wish to generate, test, and/or
          extend through your research.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 6. </FigureIdentifier>
            <FigureName>
              A conceptual framework for defining designs in terms of processes
            </FigureName>
          </div>
          <img src="/design_banner.png" width="100%" height="100%" style={{ maxWidth: '800px' }} />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={examples} style={{ marginTop: '2rem' }}>
          Types and Examples
        </SubHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Design</TableHeader>
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
                <p>Correlational</p>
              </TableData>
              <TableData>Processes exist and can be quantified.</TableData>
              <TableData>Researchers can know processes. Researchers observe processes.</TableData>
              <TableData>Validated instruments, measures</TableData>
              <TableData>Percentages, Pearson’s r, Spearman’s rho, Chi-square</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Descriptive</p>
              </TableData>
              <TableData>Processes exist after being identified.</TableData>
              <TableData>
                Researchers can give a rich knowledge of processes. Researchers view processes
                through their personal perspectives.
              </TableData>
              <TableData>Interviews, textual data</TableData>
              <TableData>Visualizations, frequencies, quotes</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Diagnostic</p>
              </TableData>
              <TableData>Processes exist as direct precursors to outcomes.</TableData>
              <TableData>
                Researchers can know the cause and effect purpose of processes. Researchers attempt
                to make objective observations and judgements.
              </TableData>
              <TableData>Standardized protocols, interviews, direct observation</TableData>
              <TableData>Prescriptions, generalizations</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Experimental</p>
              </TableData>
              <TableData>Processes exist when controlling for extraneous factors.</TableData>
              <TableData>
                Researchers know important elements of processes. Researchers separate elements of
                processes.
              </TableData>
              <TableData>Validated instruments</TableData>
              <TableData>Uni-, bi-, and multivariate statistics</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Designs”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying analysis designs through lenses we consider broadly authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aanalysis&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Sage"
            onClick={() => {
              window.open(
                'https://methods.sagepub.com/reference/encyc-of-research-design?fromsearch=true',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <Button
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/search?query=research');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
