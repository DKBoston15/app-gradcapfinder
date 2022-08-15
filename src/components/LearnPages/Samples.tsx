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

export default function Samples() {
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
          Samples describe attributes used to generate results from analyses for supporting claims
          of representation for populations.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Samples provide foundational sets of beliefs and understandings about the role of
          representation for the sample statistics in relation to population parameters. This allows
          researchers to generate, test, and extend theories and practices associated with research
          into the validity of sample statistics in their analyses. To recognize the samples that
          influences your analyses, you will need to answer a few philosophical questions. For
          example, responses to ontological (e.g., what is the nature of representation?),
          epistemological (e.g., what can researchers know about representation?), and
          methodological (e.g., how do researchers gain knowledge about representation) questions
          will help you to generate your own foundational sets of beliefs and understandings of
          representation. In turn, they inform your identification of products you wish to generate,
          test, and/or extend through your analyses.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 10. </FigureIdentifier>
            <FigureName>
              A conceptual framework for defining questions in samples of representation
            </FigureName>
          </div>
          <img src="/samples_banner.png" width="100%" height="100%" style={{ maxWidth: '800px' }} />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={examples} style={{ marginTop: '2rem' }}>
          Types and Examples
        </SubHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Sample</TableHeader>
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
                <p>Convenience</p>
              </TableData>
              <TableData>
                Representation exists outside the need for generalizable information.
              </TableData>
              <TableData>
                Researchers know the least about representation. Researchers do not consider the
                value of representation.
              </TableData>
              <TableData>Chance</TableData>
              <TableData>The average person for the time and place of the researcher.</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Purposive</p>
              </TableData>
              <TableData>Representation exists to serve the purpose of the researcher.</TableData>
              <TableData>
                Researchers can know the representation of unknown populations. Researchers use
                representation to further their agenda.
              </TableData>
              <TableData>Personal intent of researcher</TableData>
              <TableData>Persons’ meeting researchers’ needs.</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Snowball</p>
              </TableData>
              <TableData>
                Social influence removes the need to consider the existence of representation.
              </TableData>
              <TableData>
                Researchers can know the value of participants in representation. Researchers use
                participants for representation.
              </TableData>
              <TableData>Personal intent of study participant</TableData>
              <TableData>Persons as a complex web of social connections.</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Simple random</p>
              </TableData>
              <TableData>
                Representation exists and can lead to better understanding of the population.
              </TableData>
              <TableData>
                Researchers can know representation. Researchers are distinct from representation.
              </TableData>
              <TableData>Sampling frame</TableData>
              <TableData>The average person for the time and place of a population.</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Cluster</p>
              </TableData>
              <TableData>
                Representation exists and relates to elements in the population.
              </TableData>
              <TableData>
                Researchers can know both representation and elements influencing representation.
                Researchers choose elements for viewing representation.
              </TableData>
              <TableData>Sampling frame, population descriptors</TableData>
              <TableData>Persons within specified physical groupings of a population.</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Systematic</p>
              </TableData>
              <TableData>
                Representation exists and external methods can improve understanding of the
                population.
              </TableData>
              <TableData>
                Researchers can know both representation and how they view representation.
                Researchers choose how to relate to representation.
              </TableData>
              <TableData>Sampling frame, population descriptors, population hierarchies</TableData>
              <TableData>Persons within specified orders of a population.</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Sampling”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying the role of analytic representation through lenses we consider broadly
          authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Asampling&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Sage"
            onClick={() => {
              window.open(
                'https://methods.sagepub.com/reference/encyclopedia-of-survey-research-methods/n503.xml',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/search?query=sampling+designs');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
