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

const video = {
  id: 1,
  name: 'Identifying Questions',
  thumbnail: 'https://img.youtube.com/vi/aRV2WnD5sxY/mqdefault.jpg',
  date: '10/24/2019',
  time: '47:51',
  url: 'https://youtu.be/aRV2WnD5sxY?t=1160',
};

export default function Questions() {
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
          Research questions express the perspective of researchers in the act of observation during
          research.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Research questions provide foundational sets of beliefs and understandings about the role
          of observations in research. This allows researchers to generate, test, and extend
          theories and practices associated with those observations used by themselves in conducting
          research. To recognize the questions that influences your research, you will need to
          answer a few philosophical questions. For example, responses to ontological (e.g., what is
          the nature of observation?), epistemological (e.g., what can researchers know about
          observations?), and methodological (e.g., how do researchers gain knowledge through
          observation) questions will help you to generate your own foundational sets of beliefs and
          understandings about research questions. In turn, they inform your identification of
          products you wish to generate, test, and/or extend through your research.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 7. </FigureIdentifier>
            <FigureName>
              A conceptual framework for defining questions in terms of observation
            </FigureName>
          </div>

          <img
            src="/research_question.png"
            width="100%"
            height="100%"
            style={{ maxWidth: '800px' }}
          />
        </Paragraph>
        <CustomDivider />
        <Video video={video} />
        <CustomDivider />
        <SubHeader ref={examples} style={{ marginTop: '2rem' }}>
          Types and Examples
        </SubHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Research Question</TableHeader>
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
                <p>Exploratory</p>
              </TableData>
              <TableData>Observation exists as a generalized action.</TableData>
              <TableData>
                Researchers can know methods of observation. Researchers reduce bias from
                observation.
              </TableData>
              <TableData>Interviews, textual notes, simple statistics</TableData>
              <TableData>Qualitatively, Mixed manner</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Predictive</p>
              </TableData>
              <TableData>Observation exists in the future.</TableData>
              <TableData>
                Researchers may or may not know observation. Researchers may or may not place
                themselves in the observation.
              </TableData>
              <TableData>
                Interviews, current events, textual notes, Multivariate analysis
              </TableData>
              <TableData>Qualitatively, Mixed manner, Quantitatively</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Interpretive</p>
              </TableData>
              <TableData>Observation exists in nature.</TableData>
              <TableData>
                Researchers can know setting of observation. Researchers take no action during
                observation.
              </TableData>
              <TableData>Interviews, secondary interviews, simple statistics</TableData>
              <TableData>Qualitatively, Mixed manner</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Comparative</p>
              </TableData>
              <TableData>Observation may or may not exist in a causal framework.</TableData>
              <TableData>
                Researchers can know elements for observation. Researchers may or may not
                participate in observation.
              </TableData>
              <TableData>Interviews, Correlational analysis</TableData>
              <TableData>Mixed manner, Quantitatively</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Relationship</p>
              </TableData>
              <TableData>Observation exists in a causal framework.</TableData>
              <TableData>
                Researchers know elements for observation. Researchers choose to not participate in
                observation.
              </TableData>
              <TableData>Multivariate analysis</TableData>
              <TableData>Mixed manner, Quantitatively</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Questions”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying research questions through lenses we consider broadly authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aresearch_design&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/search?query=research+questions');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
