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

export default function Models() {
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
          Models characterize those variables used to conduct analyses in understanding those ideas
          that inform research.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Models provide foundational sets of beliefs and understandings about ideas used to guide
          analyses. This allows researchers to generate, test, and extend theories and practices
          associated with your analyses. To recognize the models that influences your analyses, you
          will need to answer a few philosophical questions. For example, responses to ontological
          (e.g., what is the nature of an idea?), epistemological (e.g., what can researchers know
          about an idea?), and methodological (e.g., how do researchers gain knowledge about an
          idea) questions will help you to generate your own foundational sets of beliefs and
          understandings about your models. In turn, they inform your identification of products you
          wish to generate, test, and/or extend through your analyses.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 9. </FigureIdentifier>
            <FigureName>A conceptual framework for defining models in terms of an idea</FigureName>
          </div>
          <img src="/models_banner.png" width="100%" height="100%" style={{ maxWidth: '800px' }} />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={examples} style={{ marginTop: '2rem' }}>
          Types and Examples
        </SubHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Model</TableHeader>
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
                <p>Conceptual</p>
              </TableData>
              <TableData>Ideas exist as general themes.</TableData>
              <TableData>
                Researchers can know ideas. Researchers may identify with ideas.
              </TableData>
              <TableData>Internal thought processes</TableData>
              <TableData>Broadly, Explorative</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Theoretical</p>
              </TableData>
              <TableData>Ideas exist as concrete themes.</TableData>
              <TableData>Researchers know ideas. Researchers rarely identify with ideas.</TableData>
              <TableData>Internal thought and external observation</TableData>
              <TableData>Specifically, Explanatory</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Empirical</p>
              </TableData>
              <TableData>Ideas exist as potential themes.</TableData>
              <TableData>Researchers know ideas. Researchers never identify with ideas.</TableData>
              <TableData>External observation</TableData>
              <TableData>Mathematically, Deductive</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Empirical
          models”. These links do not provide exhaustive information, rather, they provide an
          opportunity to begin studying the use of empirical abstraction through lenses we consider
          broadly authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aempirical_Modeling&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Sage"
            onClick={() => {
              window.open('https://methods.sagepub.com/Search/Results');
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/search?query=empirical+models');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
