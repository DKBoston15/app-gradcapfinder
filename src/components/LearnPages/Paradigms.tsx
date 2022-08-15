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

export default function Paradigms() {
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
          Research paradigms provide theoretical support in the development of research products
          from studying some form of reality.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Paradigms provide foundational sets of beliefs and understandings about reality. This
          allows researchers to generate, test, and extend theories and practices associated with
          research into reality. To recognize the paradigm that influences your research, you will
          need to answer a few philosophical questions. For example, responses to ontological (e.g.,
          what is the nature of reality?), epistemological (e.g., what can researchers know about
          reality?), and methodological (e.g., how do researchers gain knowledge about reality)
          questions will help you to generate your own foundational sets of beliefs and
          understandings about paradigms. In turn, they inform your identification of products you
          wish to generate, test, and/or extend through your research.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 2. </FigureIdentifier>
            <FigureName>
              Philosophical Influence on the Development of Research Paradigms
            </FigureName>
          </div>
          <img
            src="/research_paradigm.png"
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
              <TableHeader>Research Paradigm</TableHeader>
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
                <a
                  href="https://www.sciencedirect.com/topics/social-sciences/positivism"
                  target="_blank">
                  Positivism
                </a>
              </TableData>
              <TableData>Reality exists and can be captured, studied, and understood.</TableData>
              <TableData>
                Researchers can know reality. Researchers are distinct from reality.
              </TableData>
              <TableData>Experiments, quasi-experiments, surveys</TableData>
              <TableData>Facts, theories, laws</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <a
                  href="https://methods.sagepub.com/reference/the-sage-encyclopedia-of-educational-research-measurement-and-evaluation/i16217.xml"
                  target="_blank">
                  Post positivism
                </a>
              </TableData>
              <TableData>Reality exists but cannot be fully understood.</TableData>
              <TableData>
                Researchers can approximate reality. Researchers act as data collection instruments
                in attempting to understand reality.
              </TableData>
              <TableData>Frequencies, qualitative methods</TableData>
              <TableData>Generalizations, descriptions, patterns, grounded theories</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <a
                  href="https://www.sciencedirect.com/topics/psychology/constructivism"
                  target="_blank">
                  Constructivism
                </a>
              </TableData>
              <TableData>
                Reality exists in multiple states and is constructed by individuals.
              </TableData>
              <TableData>
                Researchers believe that knowledge of reality is constructed. Researchers and
                participants co-construct knowledge about reality.
              </TableData>
              <TableData>Naturalistic inquiry</TableData>
              <TableData>Case studies, narratives, reconstructions</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <a
                  href="https://www.oxfordbibliographies.com/view/document/obo-9780195396577/obo-9780195396577-0374.xml?rskey=v4JfuZ&result=1&q=critical+theory#firstMatch"
                  target="_blank">
                  Critical
                </a>
              </TableData>
              <TableData>
                An individual’s reality exists in terms of multiple factors (e.g., class, gender,
                and race).
              </TableData>
              <TableData>
                Researchers view knowledge as subjective and political. Researchers infuse values
                into their inquiry of reality.
              </TableData>
              <TableData>Transformative inquiry</TableData>
              <TableData>Critiques of power structures</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <a
                  href="https://www.oxfordbibliographies.com/view/document/obo-9780190221911/obo-9780190221911-0008.xml"
                  target="_blank">
                  Post structuralism
                </a>
              </TableData>
              <TableData>
                Order is created within the minds of individuals to give meaning to a meaningless
                reality.
              </TableData>
              <TableData>
                Researchers do not believe a reality exists to know. Researchers examine false
                realities through textual representation.
              </TableData>
              <TableData>Deconstruction, genealogy</TableData>
              <TableData>Deconstructions, genealogies, reflexive texts</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Paradigms”.
          These links do not provide exhaustive information, rather, they an opportunity to begin
          studying paradigms through lenses we consider broadly authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aparadigms&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Sage"
            onClick={() => {
              window.open(
                'https://methods.sagepub.com/reference/the-sage-dictionary-of-social-research-methods/n141.xml#:~:text=The%20general%20principles%20of%20the,of%20law%20to%20be%20considered',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <Button
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/entries/thomas-kuhn/');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
