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

export default function Techniques() {
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
          Techniques convey the manner in which researchers portray their analyses while
          standardizing methods.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Techniques provide foundational sets of beliefs and understandings about methods used to
          conduct analyses. This allows researchers to generate, test, and extend theories and
          practices associated with those techniques used in conducting analyses. To recognize the
          techniques that influences your analyses, you will need to answer a few philosophical
          questions. For example, responses to ontological (e.g., what is the nature of a method?),
          epistemological (e.g., what can researchers know about a method?), and methodological
          (e.g., how do researchers gain knowledge about a method) questions will help you to
          generate your own foundational sets of beliefs and understandings about how to use
          techniques. In turn, they inform your identification of products you wish to generate,
          test, and/or extend through your analyses.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 11. </FigureIdentifier>
            <FigureName>
              A conceptual framework for defining techniques in terms of a method
            </FigureName>
          </div>
          <img
            src="/techniques_banner.png"
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
              <TableHeader>Technique</TableHeader>
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
                <p>Content</p>
              </TableData>
              <TableData>Methods exist as easily accessible.</TableData>
              <TableData>
                Researchers can create techniques. Researchers infuse themselves in techniques.
              </TableData>
              <TableData>Criteria for inclusion</TableData>
              <TableData>Constructing units of analysis, Constructing codes for meaning</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Narrative</p>
              </TableData>
              <TableData>
                Methods exist to highlight the interactive and change qualities of life.
              </TableData>
              <TableData>
                Researchers can observe techniques. Researchers act as interpreters for the
                techniques expressed by study participants.
              </TableData>
              <TableData>Diversity in criterion for inclusion</TableData>
              <TableData>Selecting data sources</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Thematic</p>
              </TableData>
              <TableData>Methods exist to support personal understanding.</TableData>
              <TableData>
                Researchers can experience techniques. Researchers become the avatar of techniques.
              </TableData>
              <TableData>Induction/deductive approaches, semantic/latent approaches</TableData>
              <TableData>Summarizing codes</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Univariate</p>
              </TableData>
              <TableData>
                Methods exist to support a quantifiable understanding of the world.
              </TableData>
              <TableData>
                Researchers can know techniques. Researchers are distinct from techniques.
              </TableData>
              <TableData>Statistical software, text, interviews</TableData>
              <TableData>
                Knowing and understanding jargon, differentiating point estimates from intervals
              </TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Bivariate</p>
              </TableData>
              <TableData>Methods exist to support the interaction of ideas.</TableData>
              <TableData>
                Researchers can know techniques. Researchers are distinct from techniques.
              </TableData>
              <TableData>Statistical software, text, interviews</TableData>
              <TableData>Knowing and understanding jargon, Quantifying interactions</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Multivariate</p>
              </TableData>
              <TableData>Methods exist to reflect the complexity of reality.</TableData>
              <TableData>
                Researchers can know techniques. Researchers are distinct from techniques.
              </TableData>
              <TableData>Statistical software, text, interviews</TableData>
              <TableData>Knowing and understanding jargon, Quantifying interactions</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as,
          “Techniques”. These links do not provide exhaustive information, rather, they provide an
          opportunity to begin studying analytical techniques through lenses we consider broadly
          authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Adata_analysis&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/search?query=analysis+techniques');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
